export type TechnologyStatus = | "completed" | "in-progress" | "not-started";

export type Technology = {
    id: number;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "not-started";
    category: string;
    notes: string;
  };