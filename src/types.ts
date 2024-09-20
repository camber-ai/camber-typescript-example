/*

Camber API Types

*/

/*

Verification Level Types

*/

export interface StartVerificationRequest {
  verification_type: string; // tuberculosis_test, covid_vaccination, life_support_certification, etc
  external_id?: string; // verification id from your own system (optional)
  metadata?: Record<string, string>; // arbitrary data you want to attach to the verification (optional)
  document: {
    url: string;
    external_id?: string; // document id from your own system (optional)
  };
  person: {
    first_name: string;
    last_name: string;
    dob?: string; // YYYY-MM-DD
    external_id?: string; // user id or something similar (optional)
  };
  test_response?: {
    status?: VerifStatus;
    decision?: VerifDecision;
  };
}

export interface ApiError {
  error: string;
  message: string;
}

export type VerifStatus = "scheduled" | "processing" | "completed" | "failed";
export type VerifMode = "test" | "live";
export type VerifDecision = "accepted" | "rejected" | "flagged";

export interface VerificationJob {
  object: "verification";
  id: string;
  uri: string;
  status: VerifStatus;
  mode: VerifMode;
  created_at: string;
  updated_at: string;
  document_id: string;
  person_id: string;
  external_id: string;
  metadata: Record<string, string>;
}

export type StartVerificationResponse = VerificationJob | ApiError;

export interface Verification extends VerificationJob {
  decision: VerifDecision;
  decision_confidence: number;
  issues: string[];
  data: Record<any, any>;
}

export type GetVerificationResponse = Verification | ApiError;

/*

Camber Webhooks

*/

export type CamberWhEventType =
  | "verification.completed"
  | "verification.failed";
export interface CamberWhEvent {
  event_type: CamberWhEventType;
  mode: VerifMode;
  timestamp: string;
  verification_id: string;
  verification_type: string;
}
