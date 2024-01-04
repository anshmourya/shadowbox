import React from "react";
import { Client, Account, ID } from "appwrite";

export const useAccount = () => {
  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_PROJECT_KEY);

  const createSession = async (email, password) => {
    try {
      const sessionCreation = await account.createEmailSession(email, password);
      console.log(sessionCreation);
      return sessionCreation;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createAccount = async (userData) => {
    try {
      const accountCreation = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        userData.name
      );
      console.log(accountCreation);
      return accountCreation;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getCurrentUser = async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const isLogged = async () => {
    try {
      const data = await getCurrentUser();
      return Boolean(data);
    } catch (error) {
      return false;
    }
  };
  return { createAccount, createSession, getUser };
};
