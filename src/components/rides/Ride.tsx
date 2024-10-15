// Vehicle.ts
export interface Vehicle {
    vehicle_brand: string;
    vehicle_capacity: number;
    vehicle_color: string;
    vehicle_modal: string;
    vehicle_number: string;
    vehicle_type: string;
}

// Ride.ts

export default interface Ride {
    _id: { $oid: string }; 
    address_from: string;
    address_to: string;
    instant_booking: string;
    pick_up_time: string;
    price: string;
    ladies_only: string;
    requested_user: any[];
    response_time: string;
    ride_info: string;
    seats: number; 
    status: string;
    stoppers: any[]; 
    vehicle: Vehicle;  // Use the Vehicle interface
    user_id: string;
    created_at: string;
    updated_at: string;
}
