import { User } from '../types';

// Centralized dummy data for the app
export const dummyUser: User = {
  id: 1,
  name: 'Sam',
  email: 'sam@example.com',
  fullName: 'Sam Ahmed',
};

export const dummyToken = 'dummy-token-mediconnect-123';

export const dummyDoctors = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialty: 'Cardiologist', hospital: 'City Medical Center', rating: 4.8, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' },
  { id: 2, name: 'Dr. Ali Khan', specialty: 'Neurologist', hospital: 'National Hospital', rating: 4.6, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' },
  { id: 3, name: 'Dr. Fatima Malik', specialty: 'Dermatologist', hospital: 'Skin Care Clinic', rating: 4.9, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964f7b0?w=100&h=100&fit=crop&crop=face' },
];

export const dummyAppointments = [
  { id: 1, doctor: 'Dr. Sarah Ahmed', specialty: 'Cardiologist', date: 'June 12', time: '2:30 PM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Ali Khan', specialty: 'Neurologist', date: 'June 15', time: '10:00 AM', status: 'Pending' },
];

export const dummyPrescriptions = [
  { id: 1, medicine: 'Amoxicillin 500mg', doctor: 'Dr. Sarah Ahmed', date: '2024-06-10', dosage: '3 times/day', duration: '7 days' },
  { id: 2, medicine: 'Paracetamol 500mg', doctor: 'Dr. Ali Khan', date: '2024-06-08', dosage: '2 times/day', duration: '5 days' },
];
