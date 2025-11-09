"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignUpForm from "./Signup/Signup";
import SignInForm from "./SignIn/Signin";
import { Button } from "@/components/ui/button";
import Banner from "@/components/Auth/Banner";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");

  const handleSignUpSubmit = (data: any) => {
    console.log("Sign Up", data);
  };

  const handleSignInSubmit = (data: any) => {
    console.log("Sign In", data);
  };

  return (
    <section>
      <Banner
        title={
          activeTab === "signin"
            ? "Welcome Back! Log In to Continue"
            : "Join As a  User"
        }
      />
      <div className="min-h-screen flex justify-center px-4">
        <div className="w-full max-w-2xl my-15">
          <div className="bg-white rounded shadow overflow-hidden">
            <div className="md:p-8 p-4 border">
              <div className="flex">
                <Button
                  className={`flex-1 rounded transition-none rounded-r-none ${
                    activeTab === "signup"
                      ? "bg-primary font-semibold text-white"
                      : "text-gray-600 bg-transparent hover:bg-transparent border"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </Button>
                <Button
                  className={`flex-1 rounded transition-none rounded-l-none ${
                    activeTab === "signin"
                      ? "bg-primary font-semibold text-white"
                      : "text-gray-600 bg-transparent hover:bg-transparent border"
                  }`}
                  onClick={() => setActiveTab("signin")}
                >
                  Sign In
                </Button>
              </div>
              <AnimatePresence mode="wait">
                {activeTab === "signup" ? (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignUpForm
                      onSubmit={handleSignUpSubmit}
                      setActiveTab={setActiveTab}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignInForm
                      onSubmit={handleSignInSubmit}
                      setActiveTab={setActiveTab}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
