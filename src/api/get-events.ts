import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TEvent } from "@/types";
import { BASE_API_URL } from "@/constants";

export const getEvents = async (
  isLive?: boolean
): Promise<TEvent[] | undefined> => {
  try {
    const endpoint = `${BASE_API_URL}/events`;

    if (isLive) {
      const liveEvents = await axios.get(`${endpoint}?_is_live=true`);
      if (liveEvents.data.results.length > 0) {
        return liveEvents.data.results;
      }
    }

    const response = await axios.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return;
  }
};

export async function getRelatedEvents(
  id: number
): Promise<TEvent[] | undefined> {
  try {
    const endpoint = `${BASE_API_URL}/events/${id}/related`;

    const response = await axios.get(endpoint);

    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return;
  }
}

export async function getEventById(id: string): Promise<TEvent | undefined> {
  try {
    const endpoint = `${BASE_API_URL}/events/${id}`;

    const response = await axios.get(endpoint);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return;
  }
}

export function useGetEvents({ isLive }: { isLive?: boolean }) {
  const results = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(isLive),
  });

  return {
    ...results,
    events: results.data,
  };
}

export function useGetRelatedEvents({ id }: { id?: number }) {
  const results = useQuery({
    queryKey: ["events/related"],
    queryFn: () => getRelatedEvents(id!),
  });

  return {
    ...results,
    events: results.data,
  };
}

export function useGetEvent({ id }: { id?: string }) {
  const results = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id!),
  });

  return results;
}
