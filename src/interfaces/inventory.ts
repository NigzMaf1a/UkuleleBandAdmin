export default interface Inventory {
  EquipmentID: number;
  Price: number;
  Description: "Speaker" | "Microphone" | "Mixer" | "CDJ" | "Cable" | "Wireless";
  PurchaseDate: Date;
  Condition: "CAT1" | "CAT2" | "CAT3" | "CAT4";
  Availability: "Available" | "Unavailable";
}