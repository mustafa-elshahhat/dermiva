// Customer / account domain types.

/** A saved shipping address. */
export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  gov: string;
  isDefault: boolean;
}
