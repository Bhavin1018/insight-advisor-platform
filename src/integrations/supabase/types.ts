export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analysis_results: {
        Row: {
          completed_at: string
          confidence_score: number | null
          execution_time_ms: number | null
          id: string
          model_name: string
          model_version: string | null
          recommendations: Json | null
          results: Json | null
          risk_assessment: Json | null
          session_id: string
        }
        Insert: {
          completed_at?: string
          confidence_score?: number | null
          execution_time_ms?: number | null
          id?: string
          model_name: string
          model_version?: string | null
          recommendations?: Json | null
          results?: Json | null
          risk_assessment?: Json | null
          session_id: string
        }
        Update: {
          completed_at?: string
          confidence_score?: number | null
          execution_time_ms?: number | null
          id?: string
          model_name?: string
          model_version?: string | null
          recommendations?: Json | null
          results?: Json | null
          risk_assessment?: Json | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "analysis_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      analysis_sessions: {
        Row: {
          analysis_type: string
          completed_at: string | null
          config: Json | null
          error_message: string | null
          id: string
          models_selected: string[] | null
          name: string
          portfolio_id: string
          progress: number
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          analysis_type: string
          completed_at?: string | null
          config?: Json | null
          error_message?: string | null
          id?: string
          models_selected?: string[] | null
          name: string
          portfolio_id: string
          progress?: number
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          analysis_type?: string
          completed_at?: string | null
          config?: Json | null
          error_message?: string | null
          id?: string
          models_selected?: string[] | null
          name?: string
          portfolio_id?: string
          progress?: number
          started_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_sessions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_data: {
        Row: {
          data: Json
          data_type: string
          expires_at: string | null
          id: string
          last_updated: string
          source: string | null
          symbol: string
        }
        Insert: {
          data?: Json
          data_type: string
          expires_at?: string | null
          id?: string
          last_updated?: string
          source?: string | null
          symbol: string
        }
        Update: {
          data?: Json
          data_type?: string
          expires_at?: string | null
          id?: string
          last_updated?: string
          source?: string | null
          symbol?: string
        }
        Relationships: []
      }
      portfolio_holdings: {
        Row: {
          allocation_percentage: number | null
          company_name: string | null
          current_price: number | null
          id: string
          last_updated: string | null
          market_cap: number | null
          portfolio_id: string
          purchase_date: string | null
          purchase_price: number | null
          quantity: number
          sector: string | null
          symbol: string
        }
        Insert: {
          allocation_percentage?: number | null
          company_name?: string | null
          current_price?: number | null
          id?: string
          last_updated?: string | null
          market_cap?: number | null
          portfolio_id: string
          purchase_date?: string | null
          purchase_price?: number | null
          quantity?: number
          sector?: string | null
          symbol: string
        }
        Update: {
          allocation_percentage?: number | null
          company_name?: string | null
          current_price?: number | null
          id?: string
          last_updated?: string | null
          market_cap?: number | null
          portfolio_id?: string
          purchase_date?: string | null
          purchase_price?: number | null
          quantity?: number
          sector?: string | null
          symbol?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_holdings_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          file_name: string | null
          id: string
          investment_goals: Json | null
          name: string
          risk_tolerance: string | null
          total_value: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          file_name?: string | null
          id?: string
          investment_goals?: Json | null
          name: string
          risk_tolerance?: string | null
          total_value?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          file_name?: string | null
          id?: string
          investment_goals?: Json | null
          name?: string
          risk_tolerance?: string | null
          total_value?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          preferences: Json | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
