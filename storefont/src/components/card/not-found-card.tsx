import {Card, CardContent} from "@/components/ui/card";

interface INotFoundCard {
    
}
export function NotFoundCard () {
    return (
        <Card>
            <CardContent>
                <img src="public/images/empty.jpg" alt=""/>
            </CardContent>
        </Card>
    )
}