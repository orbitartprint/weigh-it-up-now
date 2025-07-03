
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting contact form:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      console.log("Email sent successfully:", data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      toast({
        title: "Message sent successfully!",
        description: "We've received your message and will get back to you soon.",
      });

    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="sm" className="gap-2">
                About
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <header className="bg-gradient-to-r from-weightBlue-light to-weightBlue-dark py-8 mb-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail size={36} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Contact Us
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            Get in Touch with WeightVs.com
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <p className="text-muted-foreground">
                Have a question or suggestion? We'd love to hear from you!
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question or feedback..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending message..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Your message will be sent directly to our team at info@weightvs.com. 
                  We typically respond within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WeightVs.com | For entertainment purposes only
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            All weights are approximate and based on averages
          </p>
          <div className="mt-3 space-x-4">
            <Link 
              to="/legal" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Legal
            </Link>
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
