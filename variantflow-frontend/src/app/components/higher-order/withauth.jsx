import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, LOGIN_URL } from "../../../Util/constant";
import axios from "axios";

const withAuth = (WrappedComponent) => {
	const AuthWrapper = (props) => {
		const history = useHistory();

		// Function to refresh the access token
		const refreshAccessToken = async () => {
			try {
				const refreshToken = localStorage.getItem(REFRESH_TOKEN);
				if (!refreshToken) throw new Error("No refresh token found");

				const response = await axios.post("/api/auth/refreshToken", { refreshToken });
				const { accessToken } = response.data;

				// Store the new access token
				localStorage.setItem(ACCESS_TOKEN, accessToken);

				return accessToken;

			} catch (error) {
				console.error("Refresh token failed:", error);
				localStorage.removeItem(ACCESS_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
				history.push("/login");
				throw error;
			}
		};

		// Function to validate the access token
		const validateAccessToken = async () => {
			const accessToken = localStorage.getItem(ACCESS_TOKEN);
			if (!accessToken) {
				history.push("/login");
				return;
			}

			try {
				// Decode the access token to check expiration
				const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
				const isExpired = decodedToken.exp * 1000 < Date.now();

				if (isExpired) {
					// If expired, refresh the token
					await refreshAccessToken();
				}

			} catch (error) {
				console.error("Token validation failed:", error);
				localStorage.removeItem(ACCESS_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
				history.push("/login");
			}
		};

		// Check token validity on component mount
		useEffect(() => {
			validateAccessToken();
		}, [history]);

		return <WrappedComponent {...props} />;
	};

	return AuthWrapper;
};

export default withAuth;