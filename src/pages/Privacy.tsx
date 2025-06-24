
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <style>
        [data-custom-class='body'], [data-custom-class='body'] * {
        background: transparent !important;
        }
        [data-custom-class='title'], [data-custom-class='title'] * {
        font-family: Arial !important;
        font-size: 26px !important;
        color: #000000 !important;
        }
        [data-custom-class='subtitle'], [data-custom-class='subtitle'] * {
        font-family: Arial !important;
        color: #595959 !important;
        font-size: 14px !important;
        }
        [data-custom-class='heading_1'], [data-custom-class='heading_1'] * {
        font-family: Arial !important;
        font-size: 19px !important;
        color: #000000 !important;
        }
        [data-custom-class='heading_2'], [data-custom-class='heading_2'] * {
        font-family: Arial !important;
        font-size: 17px !important;
        color: #000000 !important;
        }
        [data-custom-class='body_text'], [data-custom-class='body_text'] * {
        color: #595959 !important;
        font-size: 14px !important;
        font-family: Arial !important;
        }
        [data-custom-class='link'], [data-custom-class='link'] * {
        color: #3030F1 !important;
        font-size: 14px !important;
        font-family: Arial !important;
        word-break: break-word !important;
        }
    </style>
    <div className="min-h-screen bg-gray-50">
    </div>
  );
};

export default Privacy;
