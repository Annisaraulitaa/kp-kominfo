// app/api/types.ts

// /charts returns { charts: HourlyData[] }
export interface HourlyData {
    hour: number;
    motor: number;
    mobil: number;
    truk: number;
    bus: number;
}
export interface ChartsResponse {
    charts: HourlyData[];
}

// /crowd_estimation returns an array of { lane_id, vehicle_count, date_time } ...
export interface CrowdEstimationItem {
    lane_id: number;
    vehicle_count: number;
    date_time: string; // ISO string
}

// /lane_counts?date=YYYY-MM-DD
// Suppose it returns { date, left_lane: {motor, mobil, truk, bus}, right_lane: {...} }
export interface LaneCountsResponse {
    date: string;
    left_lane: {
        motor: number;
        mobil: number;
        truk: number;
        bus: number;
    };
    right_lane: {
        motor: number;
        mobil: number;
        truk: number;
        bus: number;
    };
}

export interface TodayYesterdayItem {
    vehicle: string;    // "motor", "mobil", ...
    quantity: number;
}

export interface TodayYesterdayResponse {
    today: TodayYesterdayItem[];
    yesterday: TodayYesterdayItem[];
    today_date: string;      // e.g. "2024-01-24"
    yesterday_date: string;  // e.g. "2024-01-23"
}

export interface VehicleTableItem {
    vehicle: string;     // "motor", "mobil", ...
    quantity: number;
    difference: number;  // +17, -5, etc.
}
