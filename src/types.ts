/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  subTitle: string;
  engName: string;
  image: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  unit: string;
  pricePerUnit: number; // in Tomans (تومان)
}

export interface CalculationResult {
  productType: string;
  quantity: number;
  unit: string;
  approximateWeight?: number;
  estimatedPrice: number;
  breakdown: Record<string, string | number>;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  volumeDelivered?: string;
  joistDelivered?: string;
  status: 'completed' | 'ongoing';
  year: string;
  image: string;
}

export interface QuoteRequest {
  fullName: string;
  companyName?: string;
  phoneNumber: string;
  projectLocation: string;
  productType: string;
  deliveryDate: string;
  notes?: string;
  calculatedVolume?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
