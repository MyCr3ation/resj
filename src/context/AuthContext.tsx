// src/contexts/AuthContext.tsx

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { supabase } from "../supabaseClient.ts";

interface User {
	id: string;
	email: string;
	// Add other user fields if needed
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string, username: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	// Check the session when the component mounts
	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (session && session.user) {
				setUser({
					id: session.user.id,
					email: session.user.email || "",
				});
			} else {
				setUser(null);
			}
			setLoading(false);
		};

		getSession();

		// Listen for authentication state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session && session.user) {
				setUser({
					id: session.user.id,
					email: session.user.email || "",
				});
			} else {
				setUser(null);
			}
		});

		// Cleanup the subscription on unmount
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	// Login function using Supabase v2
	const login = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			throw error;
		}
		if (data.session && data.user) {
			setUser({
				id: data.user.id,
				email: data.user.email || "",
			});
		}
	};

	// Signup function using Supabase v2
	const signup = async (email: string, password: string, username: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { username } },
		});

		if (error) {
			throw error;
		}
		if (data.user) {
			setUser({
				id: data.user.id,
				email: data.user.email || "",
			});
		}
	};

	// Logout function
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw error;
		}
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, signup, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
