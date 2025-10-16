import { Badge } from "@/theme/ui/components/badge";
import { Button } from "@/theme/ui/components/button";
import { Input } from "@/theme/ui/components/input";
import { Separator } from "@/theme/ui/components/separator";
import { Textarea } from "@/theme/ui/components/textarea";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 bg-popover text-sm">
      <h1 className="bg-default p-2">Default bg</h1>
      <h1 className="bg-primary m-2">Primary bg</h1>
      <h1 className="bg-secondary m-2">Card bg</h1>
      <h1 className="bg-brand m-2">Brand bg</h1>
      <h1 className="text-default p-2">Default text</h1>
      <h1 className="text-primary m-2">Primary text</h1>
      <h1 className="text-secondary m-2">Card text</h1>
      <h1 className="text-tertiary m-2">Brand bg</h1>
      <h1 className="text-icon m-2">Brand bg</h1>
      <h1 className="text-brand-foreground m-2">Brand bg</h1>
      <h1 className="text-background-hover m-2">Brand bg</h1>
      <h1 className="text-placeholder m-2">Brand bg</h1>
      <h1 className="text-helper m-2">Brand bg</h1>
      <h1 className="shadow-card ">Hello, Next.js 14!</h1>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button size={'lg'} variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Input placeholder="Search..." prefixNode={<Search />} />
      <Input placeholder="Disabled input" disabled />
      <Textarea value={'jvhgjhwe'} />
      <Badge variant="default">Default</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="destructive">Destructive</Badge><Separator orientation='horizontal' />
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <h2 className="text-success p-8">This is a sample application using Next.js 14 with Tailwind CSS and Geist fonts.</h2>
    </div>

  );
}
