// api.ts
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export interface Assessment {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  userId: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: number;
  order: number;
  assessmentId: number;
  text: string;
  type: string;
  options: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchAssessment = async (
  id: number
): Promise<Assessment | null> => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `http://localhost:3000/api/assessments/${id}/start`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.assessment;
  } catch (error) {
    console.error("Failed to fetch assessment data", error);
    return null;
  }
};

interface AssessmentContextType {
  assessment: Assessment | null;
  loading: boolean;
  error: string | null;
  getAssessment: (id: number) => Promise<void>;
}

interface AssessmentProviderProps {
  children: React.ReactNode;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({
  children,
}) => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAssessment = async (id: number) => {
    setLoading(true);
    setError(null);
    const data = await fetchAssessment(id);
    if (data) {
      setAssessment(data);
    } else {
      setError("Failed to fetch assessment data");
    }
    setLoading(false);
  };

  return (
    <AssessmentContext.Provider
      value={{ assessment, loading, error, getAssessment }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
};
