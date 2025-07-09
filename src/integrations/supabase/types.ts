export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          interested_in_webinar: boolean
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interested_in_webinar?: boolean
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interested_in_webinar?: boolean
          name?: string | null
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
      visitor_analytics: {
        Row: {
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          ip_hash: string | null
          page_path: string
          referrer: string | null
          session_id: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_hash?: string | null
          page_path: string
          referrer?: string | null
          session_id: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_hash?: string | null
          page_path?: string
          referrer?: string | null
          session_id?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      waiting_list: {
        Row: {
          age_groups: string[]
          children_count: string
          coding_experience: string
          country: string | null
          created_at: string
          email: string
          english_level: string | null
          id: string
          name: string
          preferred_days: string[] | null
          relationship: string | null
          whatsapp: string
        }
        Insert: {
          age_groups: string[]
          children_count: string
          coding_experience: string
          country?: string | null
          created_at?: string
          email: string
          english_level?: string | null
          id?: string
          name: string
          preferred_days?: string[] | null
          relationship?: string | null
          whatsapp: string
        }
        Update: {
          age_groups?: string[]
          children_count?: string
          coding_experience?: string
          country?: string | null
          created_at?: string
          email?: string
          english_level?: string | null
          id?: string
          name?: string
          preferred_days?: string[] | null
          relationship?: string | null
          whatsapp?: string
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
          activities_visible: boolean | null
          created_at: string
          description: string
          id: string
          phase: Database["public"]["Enums"]["phase_type"]
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          activities_visible?: boolean | null
          created_at?: string
          description: string
          id?: string
          phase: Database["public"]["Enums"]["phase_type"]
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          activities_visible?: boolean | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
