import { Material, Order, User } from '../types';
import { addDays, subDays } from 'date-fns';

// Mock Users
export const users: User[] = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul@adinathindustries.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 'u2',
    name: 'Priya Patel',
    email: 'priya@adinathindustries.com',
    role: 'purchase',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 'u3',
    name: 'Amit Kumar',
    email: 'amit@adinathindustries.com',
    role: 'production',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 'u4',
    name: 'Neha Gupta',
    email: 'neha@adinathindustries.com',
    role: 'qc',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
];

// Mock Materials
export const materials: Material[] = [
  {
    id: 'm1',
    name: 'Vinyl Roll (Blue)',
    quantity: 45,
    unit: 'rolls',
    minThreshold: 20
  },
  {
    id: 'm2',
    name: 'UV Ink (Black)',
    quantity: 12,
    unit: 'liters',
    minThreshold: 15
  },
  {
    id: 'm3',
    name: 'Vinyl Roll (Red)',
    quantity: 8,
    unit: 'rolls',
    minThreshold: 10
  },
  {
    id: 'm4',
    name: 'Lamination Film',
    quantity: 30,
    unit: 'rolls',
    minThreshold: 10
  },
  {
    id: 'm5',
    name: 'UV Ink (Cyan)',
    quantity: 18,
    unit: 'liters',
    minThreshold: 15
  },
  {
    id: 'm6',
    name: 'UV Ink (Magenta)',
    quantity: 14,
    unit: 'liters',
    minThreshold: 15
  },
  {
    id: 'm7',
    name: 'UV Ink (Yellow)',
    quantity: 16,
    unit: 'liters',
    minThreshold: 15
  },
  {
    id: 'm8',
    name: 'Packaging Material',
    quantity: 200,
    unit: 'pieces',
    minThreshold: 50
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    id: 'ORD-2023-001',
    clientName: 'Reliance Industries',
    currentStage: 'printing_in_progress',
    lastUpdated: new Date(),
    created: subDays(new Date(), 7),
    stages: {
      order_received: {
        id: 's1',
        status: 'completed',
        notes: 'Order confirmed via email',
        files: [],
        completedAt: subDays(new Date(), 7),
        updatedAt: subDays(new Date(), 7)
      },
      po_uploaded: {
        id: 's2',
        status: 'completed',
        notes: 'PO received and verified',
        files: [
          {
            id: 'f1',
            name: 'PO-REL-001.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 6),
            uploadedBy: 'u2'
          }
        ],
        completedAt: subDays(new Date(), 6),
        updatedAt: subDays(new Date(), 6)
      },
      material_allocation: {
        id: 's3',
        status: 'completed',
        notes: 'All materials allocated',
        files: [],
        completedAt: subDays(new Date(), 4),
        updatedAt: subDays(new Date(), 4)
      },
      printing_in_progress: {
        id: 's4',
        status: 'in_progress',
        notes: 'First batch in printing',
        files: [],
        updatedAt: new Date()
      },
      quality_check: {
        id: 's5',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 7)
      },
      dispatched: {
        id: 's6',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 7)
      }
    }
  },
  {
    id: 'ORD-2023-002',
    clientName: 'Tata Consultancy',
    currentStage: 'quality_check',
    lastUpdated: subDays(new Date(), 1),
    created: subDays(new Date(), 15),
    stages: {
      order_received: {
        id: 's7',
        status: 'completed',
        notes: 'Urgent order',
        files: [],
        completedAt: subDays(new Date(), 15),
        updatedAt: subDays(new Date(), 15)
      },
      po_uploaded: {
        id: 's8',
        status: 'completed',
        notes: 'PO received via email',
        files: [
          {
            id: 'f2',
            name: 'TATA-PO-2023.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 14),
            uploadedBy: 'u2'
          }
        ],
        completedAt: subDays(new Date(), 14),
        updatedAt: subDays(new Date(), 14)
      },
      material_allocation: {
        id: 's9',
        status: 'completed',
        notes: 'Used premium materials',
        files: [],
        completedAt: subDays(new Date(), 10),
        updatedAt: subDays(new Date(), 10)
      },
      printing_in_progress: {
        id: 's10',
        status: 'completed',
        notes: 'Printing completed ahead of schedule',
        files: [],
        completedAt: subDays(new Date(), 3),
        updatedAt: subDays(new Date(), 3)
      },
      quality_check: {
        id: 's11',
        status: 'in_progress',
        notes: 'First batch QC in progress',
        files: [
          {
            id: 'f3',
            name: 'QC-batch1.jpg',
            url: '#',
            type: 'image/jpeg',
            uploadedAt: subDays(new Date(), 1),
            uploadedBy: 'u4'
          }
        ],
        updatedAt: subDays(new Date(), 1)
      },
      dispatched: {
        id: 's12',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 15)
      }
    }
  },
  {
    id: 'ORD-2023-003',
    clientName: 'Infosys Ltd',
    currentStage: 'order_received',
    lastUpdated: new Date(),
    created: new Date(),
    stages: {
      order_received: {
        id: 's13',
        status: 'in_progress',
        notes: 'Waiting for specifications',
        files: [],
        updatedAt: new Date()
      },
      po_uploaded: {
        id: 's14',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: new Date()
      },
      material_allocation: {
        id: 's15',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: new Date()
      },
      printing_in_progress: {
        id: 's16',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: new Date()
      },
      quality_check: {
        id: 's17',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: new Date()
      },
      dispatched: {
        id: 's18',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: new Date()
      }
    }
  },
  {
    id: 'ORD-2023-004',
    clientName: 'Wipro Technologies',
    currentStage: 'dispatched',
    lastUpdated: subDays(new Date(), 1),
    created: subDays(new Date(), 30),
    stages: {
      order_received: {
        id: 's19',
        status: 'completed',
        notes: 'Standard order',
        files: [],
        completedAt: subDays(new Date(), 30),
        updatedAt: subDays(new Date(), 30)
      },
      po_uploaded: {
        id: 's20',
        status: 'completed',
        notes: 'PO verified',
        files: [
          {
            id: 'f4',
            name: 'Wipro-Purchase-Order.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 28),
            uploadedBy: 'u2'
          }
        ],
        completedAt: subDays(new Date(), 28),
        updatedAt: subDays(new Date(), 28)
      },
      material_allocation: {
        id: 's21',
        status: 'completed',
        notes: 'All materials allocated',
        files: [],
        completedAt: subDays(new Date(), 25),
        updatedAt: subDays(new Date(), 25)
      },
      printing_in_progress: {
        id: 's22',
        status: 'completed',
        notes: 'Printing completed',
        files: [],
        completedAt: subDays(new Date(), 15),
        updatedAt: subDays(new Date(), 15)
      },
      quality_check: {
        id: 's23',
        status: 'completed',
        notes: 'All batches passed QC',
        files: [
          {
            id: 'f5',
            name: 'QC-report.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 5),
            uploadedBy: 'u4'
          }
        ],
        completedAt: subDays(new Date(), 5),
        updatedAt: subDays(new Date(), 5)
      },
      dispatched: {
        id: 's24',
        status: 'completed',
        notes: 'Dispatched via BlueDart. Tracking: BD839102934',
        files: [
          {
            id: 'f6',
            name: 'delivery-challan.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 1),
            uploadedBy: 'u3'
          }
        ],
        completedAt: subDays(new Date(), 1),
        updatedAt: subDays(new Date(), 1)
      }
    }
  },
  {
    id: 'ORD-2023-005',
    clientName: 'HCL Technologies',
    currentStage: 'material_allocation',
    lastUpdated: subDays(new Date(), 2),
    created: subDays(new Date(), 10),
    stages: {
      order_received: {
        id: 's25',
        status: 'completed',
        notes: 'Repeat customer order',
        files: [],
        completedAt: subDays(new Date(), 10),
        updatedAt: subDays(new Date(), 10)
      },
      po_uploaded: {
        id: 's26',
        status: 'completed',
        notes: 'PO received and processed',
        files: [
          {
            id: 'f7',
            name: 'HCL-PO-2023-10.pdf',
            url: '#',
            type: 'application/pdf',
            uploadedAt: subDays(new Date(), 8),
            uploadedBy: 'u2'
          }
        ],
        completedAt: subDays(new Date(), 8),
        updatedAt: subDays(new Date(), 8)
      },
      material_allocation: {
        id: 's27',
        status: 'in_progress',
        notes: 'Waiting for vinyl rolls delivery',
        files: [],
        updatedAt: subDays(new Date(), 2)
      },
      printing_in_progress: {
        id: 's28',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 10)
      },
      quality_check: {
        id: 's29',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 10)
      },
      dispatched: {
        id: 's30',
        status: 'pending',
        notes: '',
        files: [],
        updatedAt: subDays(new Date(), 10)
      }
    }
  }
];

// Helper Functions
export const getActiveOrders = () => orders.filter(order => order.currentStage !== 'dispatched');
export const getPendingPOOrders = () => orders.filter(order => order.currentStage === 'order_received');
export const getOrdersInQC = () => orders.filter(order => order.currentStage === 'quality_check');
export const getLowStockMaterials = () => materials.filter(material => material.quantity < material.minThreshold);

export const getCurrentUser = (): User => {
  return users[0]; // Default to first user for mock data
};