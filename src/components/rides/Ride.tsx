export  default interface Ride {
    _id: { $oid: string }; 
    address_from: string;
    address_to: string;
    instant_booking: string;
    pick_up_time: string;
    price: string;
    ladies_only: string;
    requested_user: string;
    response_time: string;
    ride_info: string;
    seats: number; 
    status: string;
    stoppers: any[]; 
    vehicle: object;  
    user_id: string;
    created_at: string;
    updated_at: string;
}
