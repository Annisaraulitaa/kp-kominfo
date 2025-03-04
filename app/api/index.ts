// app/api/index.ts
import { ChartsResponse, CrowdEstimationItem, LaneCountsResponse, VehicleTableItem, TodayYesterdayResponse } from "./types";

const BASE_URL = "http://127.0.0.1:5000/api";
// or wherever your Flask app is served

// 1) /charts
export async function fetchCharts(): Promise<ChartsResponse> {
    const res = await fetch(`${BASE_URL}/charts`);
    if (!res.ok) {
        throw new Error(`Failed to fetch charts: ${res.statusText}`);
    }
    return res.json();
}

// 2) /crowd_estimation
export async function fetchCrowdEstimation(): Promise<CrowdEstimationItem[]> {
    const res = await fetch(`${BASE_URL}/crowd_estimation`);
    if (!res.ok) {
        throw new Error(`Failed to fetch crowd_estimation: ${res.statusText}`);
    }
    return res.json();
}

// 3) /lane_counts?date=YYYY-MM-DD
export async function fetchLaneCounts(dateStr: string): Promise<LaneCountsResponse> {
    const res = await fetch(`${BASE_URL}/lane_counts?date=${dateStr}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch lane_counts: ${res.statusText}`);
    }
    return res.json();
}

// 1) /today_yesterday (no parameters)
export async function fetchTodayYesterday(): Promise<TodayYesterdayResponse> {
    const res = await fetch(`${BASE_URL}/today_yesterday`);
    if (!res.ok) {
        throw new Error(`Failed to fetch /today_yesterday: ${res.statusText}`);
    }
    return res.json();
}

// 2) /vehicle_table?date=TODAY|YESTERDAY&time=MORNING|NOON|AFTERNOON
export async function fetchVehicleTable(dateOpt: string, timeOpt: string): Promise<VehicleTableItem[]> {
    const res = await fetch(`${BASE_URL}/vehicle_table?date=${dateOpt}&time=${timeOpt}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch /vehicle_table: ${res.statusText}`);
    }
    return res.json();
}