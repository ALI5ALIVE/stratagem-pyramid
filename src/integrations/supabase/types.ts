export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      academy_attempts: {
        Row: {
          answers: Json
          completed_at: string
          correct_count: number
          id: string
          module_id: string
          passed: boolean
          score: number
          started_at: string
          total_questions: number
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          correct_count: number
          id?: string
          module_id: string
          passed: boolean
          score: number
          started_at?: string
          total_questions: number
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          correct_count?: number
          id?: string
          module_id?: string
          passed?: boolean
          score?: number
          started_at?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_attempts_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "academy_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      academy_modules: {
        Row: {
          accent_color: string | null
          created_at: string
          estimated_minutes: number
          id: string
          kicker: string | null
          learning_goal: string
          module_number: number
          order_index: number
          pass_threshold: number
          slide_ids: string[]
          specialty: string | null
          title: string
          track: string
          updated_at: string
          week_number: number | null
        }
        Insert: {
          accent_color?: string | null
          created_at?: string
          estimated_minutes?: number
          id: string
          kicker?: string | null
          learning_goal: string
          module_number: number
          order_index: number
          pass_threshold?: number
          slide_ids?: string[]
          specialty?: string | null
          title: string
          track?: string
          updated_at?: string
          week_number?: number | null
        }
        Update: {
          accent_color?: string | null
          created_at?: string
          estimated_minutes?: number
          id?: string
          kicker?: string | null
          learning_goal?: string
          module_number?: number
          order_index?: number
          pass_threshold?: number
          slide_ids?: string[]
          specialty?: string | null
          title?: string
          track?: string
          updated_at?: string
          week_number?: number | null
        }
        Relationships: []
      }
      academy_questions: {
        Row: {
          correct_key: string
          created_at: string
          explanation: string
          id: string
          module_id: string
          options: Json
          order_index: number
          prompt: string
          updated_at: string
        }
        Insert: {
          correct_key: string
          created_at?: string
          explanation?: string
          id?: string
          module_id: string
          options: Json
          order_index?: number
          prompt: string
          updated_at?: string
        }
        Update: {
          correct_key?: string
          created_at?: string
          explanation?: string
          id?: string
          module_id?: string
          options?: Json
          order_index?: number
          prompt?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_questions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "academy_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          deck_id: string | null
          duration_ms: number | null
          id: string
          route: string
          session_id: string | null
          user_id: string
          viewed_at: string
        }
        Insert: {
          deck_id?: string | null
          duration_ms?: number | null
          id?: string
          route: string
          session_id?: string | null
          user_id: string
          viewed_at?: string
        }
        Update: {
          deck_id?: string | null
          duration_ms?: number | null
          id?: string
          route?: string
          session_id?: string | null
          user_id?: string
          viewed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_color: string
          created_at: string
          display_name: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_color?: string
          created_at?: string
          display_name?: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_color?: string
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      slide_comments: {
        Row: {
          body: string
          created_at: string
          deck_id: string
          id: string
          parent_id: string | null
          resolved: boolean
          slide_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          deck_id: string
          id?: string
          parent_id?: string | null
          resolved?: boolean
          slide_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          deck_id?: string
          id?: string
          parent_id?: string | null
          resolved?: boolean
          slide_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slide_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "slide_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slide_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    }
    Views: {
      academy_progress_per_user: {
        Row: {
          attempts: number | null
          best_score: number | null
          last_attempt_at: string | null
          module_id: string | null
          passed: boolean | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "academy_attempts_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "academy_modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_module_quiz: {
        Args: { _module_id: string }
        Returns: {
          id: string
          options: Json
          order_index: number
          prompt: string
        }[]
      }
      get_user_activity_detail: {
        Args: { _user_id: string }
        Returns: {
          attempts: Json
          comments: Json
          deck_counts: Json
          page_views: Json
        }[]
      }
      get_user_activity_summary: {
        Args: never
        Returns: {
          academy_avg_score: number
          academy_last_attempt: string
          academy_modules_passed: number
          avatar_color: string
          comments_total: number
          created_at: string
          decks_visited: number
          display_name: string
          email: string
          last_comment_at: string
          last_page_view: string
          last_sign_in_at: string
          page_views_total: number
          sign_in_count: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_quiz_attempt: {
        Args: { _answers: Json; _module_id: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "owner" | "reviewer"
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
      app_role: ["owner", "reviewer"],
    },
  },
} as const
