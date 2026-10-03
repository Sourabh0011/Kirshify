import type { Seller } from "@/types/listing";

/** Sample sellers for local development. Phone numbers are fictitious. */
export const sellers: Seller[] = [
  { id: "s1", name: "Ramesh Patel", type: "farmer", location: "Narsinghpur", state: "Madhya Pradesh", experienceYears: 5, rating: 4.8, reviewCount: 24, phone: "+91 90000 00101", verified: true },
  { id: "s2", name: "Seoni Agro Producer Co.", type: "fpo", location: "Seoni", state: "Madhya Pradesh", experienceYears: 8, rating: 4.7, reviewCount: 61, phone: "+91 90000 00102", verified: true },
  { id: "s3", name: "Sunita Devi", type: "farmer", location: "Jabalpur", state: "Madhya Pradesh", experienceYears: 12, rating: 4.9, reviewCount: 38, phone: "+91 90000 00103", verified: true },
  { id: "s4", name: "Narmada Valley Farmers FPO", type: "fpo", location: "Hoshangabad", state: "Madhya Pradesh", experienceYears: 6, rating: 4.6, reviewCount: 45, phone: "+91 90000 00104", verified: true },
  { id: "s5", name: "Mahesh Yadav", type: "farmer", location: "Betul", state: "Madhya Pradesh", experienceYears: 9, rating: 4.5, reviewCount: 17, phone: "+91 90000 00105", verified: false },
  { id: "s6", name: "Kaveri Kisan Sangh", type: "fpo", location: "Jabalpur", state: "Madhya Pradesh", experienceYears: 4, rating: 4.4, reviewCount: 22, phone: "+91 90000 00106", verified: true },
  { id: "s7", name: "Anil Thakur", type: "farmer", location: "Seoni", state: "Madhya Pradesh", experienceYears: 7, rating: 4.7, reviewCount: 19, phone: "+91 90000 00107", verified: true },
  { id: "s8", name: "Satpura Growers FPO", type: "fpo", location: "Narsinghpur", state: "Madhya Pradesh", experienceYears: 10, rating: 4.8, reviewCount: 73, phone: "+91 90000 00108", verified: true },
];
