import fs from 'fs/promises';
import path from 'path';

// Define the path to our mock database file
const DB_PATH = path.join(process.cwd(), '.data', 'db.json');

// Define our data structures
export interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  category: string;
  createdAt: string;
}

interface DatabaseSchema {
  bookings: Booking[];
  portfolio: PortfolioImage[];
}

// Initial default data if the file doesn't exist
const DEFAULT_DATA: DatabaseSchema = {
  bookings: [],
  portfolio: [
    { id: "1", url: "/portfolio-1.png", title: "South Indian Bridal", category: "Bridal", createdAt: new Date().toISOString() },
    { id: "2", url: "/portfolio-2.png", title: "Punjabi Bridal", category: "Bridal", createdAt: new Date().toISOString() },
    { id: "3", url: "/portfolio-3.png", title: "Reception Glam", category: "Party", createdAt: new Date().toISOString() },
    { id: "4", url: "/portfolio-4.png", title: "Haldi Glow", category: "Pre-Wedding", createdAt: new Date().toISOString() },
    { id: "5", url: "/portfolio-5.png", title: "Classic Red", category: "Bridal", createdAt: new Date().toISOString() },
    { id: "6", url: "/portfolio-6.png", title: "Soft Pastel", category: "Bridal", createdAt: new Date().toISOString() }
  ]
};

// Helper to ensure the database file and directory exist
async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2));
  }
}

// Database API
export const db = {
  async read(): Promise<DatabaseSchema> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  },
  
  async write(data: DatabaseSchema): Promise<void> {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  },

  // Bookings Methods
  async getBookings(): Promise<Booking[]> {
    const data = await this.read();
    return data.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    const data = await this.read();
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    await this.write(data);
    return newBooking;
  },

  // Portfolio Methods
  async getPortfolio(): Promise<PortfolioImage[]> {
    const data = await this.read();
    return data.portfolio.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addPortfolioImage(image: Omit<PortfolioImage, 'id' | 'createdAt'>): Promise<PortfolioImage> {
    const data = await this.read();
    const newImage: PortfolioImage = {
      ...image,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    data.portfolio.push(newImage);
    await this.write(data);
    return newImage;
  },

  async deletePortfolioImage(id: string): Promise<void> {
    const data = await this.read();
    data.portfolio = data.portfolio.filter(img => img.id !== id);
    await this.write(data);
  }
};
