import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

interface QuoteRequest {
  guestCount: number;
  eventType: string;
  eventDate: string;
  eventTime: string;
  locationLat: number;
  locationLng: number;
  notes?: string;
}

/**
 * V1 pricing engine — generates a quote for an oyster shucker request.
 * Uses a simple rules-based formula. Admin-configurable values
 * will be pulled from adminConfig collection in Phase 7.
 */
export const generateQuote = onCall(
  { maxInstances: 10 },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Must be signed in");
    }

    const data = request.data as QuoteRequest;

    if (!data.guestCount || !data.eventType || !data.locationLat || !data.locationLng) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    const baseFee = 75;
    const perGuestRate = 3.5;
    const guestCharge = data.guestCount * perGuestRate;

    // Placeholder distance calc — will use Google Maps in Phase 6
    const distanceMiles = 5;
    const distanceRate = 1.5;
    const distanceCharge = distanceMiles * distanceRate;

    // Time component — same-day premium
    const now = new Date();
    const eventDate = new Date(`${data.eventDate}T${data.eventTime}`);
    const hoursUntilEvent = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    const sameDayPremium = hoursUntilEvent < 6 && hoursUntilEvent > 0 ? 25 : 0;

    // Surge — placeholder, will be dynamic in Phase 7
    const surgeMultiplier = 1.0;

    const subtotal = baseFee + guestCharge + distanceCharge + sameDayPremium;
    const total = Math.round(subtotal * surgeMultiplier * 100) / 100;

    const quoteBreakdown = {
      baseFee,
      guestCharge,
      guestCount: data.guestCount,
      perGuestRate,
      distanceCharge,
      distanceMiles,
      distanceRate,
      sameDayPremium,
      surgeMultiplier,
      subtotal,
      total,
    };

    const requestDoc = await db.collection("requests").add({
      customerId: request.auth.uid,
      status: "quote_generated",
      eventType: data.eventType,
      guestCount: data.guestCount,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      locationLat: data.locationLat,
      locationLng: data.locationLng,
      notes: data.notes || null,
      quotedPrice: total,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    await db.collection("pricingRecords").add({
      requestId: requestDoc.id,
      customerId: request.auth.uid,
      inputs: {
        guestCount: data.guestCount,
        eventType: data.eventType,
        distanceMiles,
        hoursUntilEvent: Math.round(hoursUntilEvent),
      },
      breakdown: quoteBreakdown,
      total,
      createdAt: FieldValue.serverTimestamp(),
    });

    logger.info("Quote generated", {
      requestId: requestDoc.id,
      total,
      uid: request.auth.uid,
    });

    return {
      requestId: requestDoc.id,
      breakdown: quoteBreakdown,
    };
  }
);
