import { StartVerificationRequest } from "./types";
import { startVerification } from "./apiClient";

const payload: StartVerificationRequest = {
  verification_type: "tuberculosis_test",
  document: {
    url: "https://picsum.photos/200/300",
  },
  person: {
    first_name: "John",
    last_name: "Doe",
    dob: "1990-01-01",
    external_id: "user123", // this is clinician's user id
  },
  external_id: "verification123", // if you're storing your own verifications
};

const main = async () => {
  const resp = await startVerification(payload);

  return resp;
};

const resp = await main();
console.log(resp);
