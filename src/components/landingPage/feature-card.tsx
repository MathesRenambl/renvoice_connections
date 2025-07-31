import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center h-12 w-12 md:h-14  md:w-14 rounded-full bg-primary mb-4 ">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl lg:text-2xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;