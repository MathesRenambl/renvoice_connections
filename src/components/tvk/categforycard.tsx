import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { usePathname, useRouter } from "next/navigation";

type Call = {
  category: string;
  call_type: 'positive' | 'negative';
  description: string;
};

type ComplaintData = {
  constituency: string;
  calls: Call[];
};

type Props = {
  complaintData: ComplaintData;
};

export default function CategoryCard({ complaintData,constituency_id,districtId }) {
  // Group calls by category

   const router = useRouter();
  const pathname = usePathname();

  const goToInsights = (category) => {
    const params = new URLSearchParams();
    params.set('constituencyId', constituency_id);
    params.set('categoryName', (category.toString()));
    params.set('districtId',districtId)
    router.push(`/operationTvk/Callinsights?${params.toString()}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      
      {complaintData.map((item)=>{
        return (
          <Card onClick={()=>goToInsights(item.category)} key={item.category} className={`${item.positive>item.negative?"bg-green-50":
            item.positive===item.negative?"bg-yellow-50":"bg-red-50"} text-black border cursor-pointer border-black/10 shadow-sm`}>
            <CardHeader >
              <CardTitle className="  text-lg font-semibold">{item.category}</CardTitle>
            
            </CardHeader>
            <CardContent className="text-sm space-y-2">
            
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                              <div className="text-2xl font-bold text-blue-600">
                                                {item.total}
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Feedbacks
                                              </div>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-2xl font-bold text-green-600">
                                                {item.positive}

                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Positive
                                              </div>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-2xl font-bold text-red-600">
                                                {item.negative}
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Negative
                                              </div>
                                            </div>
                                            
                                          </div>
                                          </div>
              
            </CardContent>
          </Card>
        );
      })}
        
    
    </div>
  );
}
