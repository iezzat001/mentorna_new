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
      founders: {
        Row: {
          created_at: string
          extended_bio: string
          id: string
          image_url: string
          is_active: boolean
          linkedin_url: string | null
          name: string
          order_index: number
          short_bio: string
          title: string
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          extended_bio: string
          id?: string
          image_url: string
          is_active?: boolean
          linkedin_url?: string | null
          name: string
          order_index?: number
          short_bio: string
          title: string
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          extended_bio?: string
          id?: string
          image_url?: string
          is_active?: boolean
          linkedin_url?: string | null
          name?: string
          order_index?: number
          short_bio?: string
          title?: string
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      week_activities: {
        Row: {
          activity_type: Database["public"]["Enums"]["activity_type"]
          created_at: string
          description: string
          duration: string
          id: string
          order_index: number
          title: string
          updated_at: string
          week_id: string
        }
        Insert: {
          activity_type: Database["public"]["Enums"]["activity_type"]
          created_at?: string
          description: string
          duration: string
          id?: string
          order_index?: number
          title: string
          updated_at?: string
          week_id: string
        }
        Update: {
          activity_type?: Database["public"]["Enums"]["activity_type"]
          created_at?: string
          description?: string
          duration?: string
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "week_activities_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      week_outcomes: {
        Row: {
          created_at: string
          id: string
          outcome_text: string
          updated_at: string
          week_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          outcome_text: string
          updated_at?: string
          week_id: string
        }
        Update: {
          created_at?: string
          id?: string
          outcome_text?: string
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "week_outcomes_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      week_skills: {
        Row: {
          created_at: string
          id: string
          order_index: number
          skill_name: string
          week_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_index?: number
          skill_name: string
          week_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number
          skill_name?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "week_skills_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      weeks: {
        Row: {
          created_at: string
          description: string
          id: string
          phase: Database["public"]["Enums"]["phase_type"]
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          phase: Database["public"]["Enums"]["phase_type"]
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          phase?: Database["public"]["Enums"]["phase_type"]
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      activity_type: "assignment" | "workshop" | "seminar" | "project"
      app_role: "super_admin" | "admin" | "moderator"
      phase_type: "Foundation Building" | "Advanced Implementation"
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
    Enums: {
      activity_type: ["assignment", "workshop", "seminar", "project"],
      app_role: ["super_admin", "admin", "moderator"],
      phase_type: ["Foundation Building", "Advanced Implementation"],
    },
  },
} as const
