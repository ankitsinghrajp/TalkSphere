import React, { type ComponentType, type ReactNode } from "react";
import Header from "./Header";
import Title from "../shared/Title";

type AppLayoutProps = {
  children?: ReactNode;
};

const AppLayout =
  (layoutProps: AppLayoutProps = {}) =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => (
      <>
      <Title/>
      <Header/>
      <div className="container dark:bg-gray-950/95 bg-gray-200 h-[calc(100vh-4rem)] mx-auto">
        
        <div className="grid grid-cols1 md:grid-cols-3">
              <div className=" md:block hidden">
                First
              </div>
              <div>
                    <WrappedComponent {...props} {...(layoutProps as P)} />
              </div>

              <div className="hidden md:block">
                Third
              </div>
        </div>
      
      </div>
      </>
    );
  };

export default AppLayout;
