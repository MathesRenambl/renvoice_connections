import * as React from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageTitle = ({ title, description = "", children }: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-2  justify-between items-start md:items-center  mb-8">
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {children && (
        <div className="flex items-center space-x-4">
          {React.Children.map(children, (child) => (
            <div>{child}</div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PageTitle;
