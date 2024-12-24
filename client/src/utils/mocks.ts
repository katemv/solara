import { IProduct } from "../types";
import image1 from "../assets/images/astro.png";
import image2 from "../assets/images/bar.png";
import image3 from "../assets/images/abstr_asto.png";
import image4 from "../assets/images/flower_asto_2.png";
import image5 from "../assets/images/planet.png";

export const productDetailsDrawerText = {
    "product_details": `**The CosMoss Explorer Space Suit** is the pinnacle of bio-mimetic and cosmic design, perfectly 
        fusing functionality with fashion for the modern space traveler. Built with advanced materials curated from 
        across the cosmos, this suit adapts to your environment and provides the utmost protection against the harshest 
        of alien worlds, all while maintaining an unparalleled level of style and sophistication. Dress for the 
        occasion, whether it's a spacewalk, an alien encounter, or a high-profile cosmic event. With the CosMoss 
        Explorer Space Suit, step into the future of interstellar apparel.`,
    "shipping_information": `At Solara, we ensure our products reach you in the fastest and most secure way possible, no matter where you are in the universe.  
        **Processing Time**: Once your order is confirmed, it will be processed within 2-3 business days.  
        **Standard Delivery**: Please allow 5-7 business days for your product to arrive at your specified location within the Milky Way Galaxy. For inhabitants outside the Milky Way, please allow 7-10 business days due to increased distances.  
        **Expedited Delivery**: An expedited shipping option is available, ensuring your package arrives in 2-3 business days within the Milky Way and 3-5 business days outside of it. Additional charges will apply for this service.  
        **Shipping Costs**: Shipping costs vary depending on the location of delivery and the weight of the package. These costs will be calculated at the time of checkout.  
        **Tracking**: Once your order has been shipped, we will provide you with a tracking number so you can follow the journey of your package.  
        **Customs and Import Duties**: Depending on your location, your order may be subject to import duties and taxes. These additional charges are not included in the website checkout process and are the responsibility of the buyer.`,
    "returns": `At Solara customer satisfaction is our top priority. If you are not completely satisfied with your purchase for any reason, you can return the product to us.  
        **1. Returns Period:**  
        You can return any item within 30 days from the date you received it, as long as it remains in the condition you received it in.  
        **2. Condition of Returned Items:**  
        All returned items must be in new, unused condition, with all original tags, labels attached, and in the original packaging. We cannot accept returns of items that have been used or damaged after delivery.  
        **3. How to Return an Item:**  
        To return an item to us, please reach out to our Customer Service team via our Contact Us page with details of your order and the reason for returning. Our team will then guide you through the return process. It is important to include your order number on your return parcel to ensure a swift refund.  
        **4. Refunds:**  
        Refunds are made to the original payment method used for purchase. Once we receive your return and inspect the item's condition, we will process your return. Please allow at least seven (7) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company.`
};


export const productMock: IProduct = {
    id: "1",
    name: "CosMoss Explorer",
    brand: "Luna",
    price: 8000,
    image: image1,
    description: `
        Embark on a journey through the uncharted realms of the cosmos with the CosmoMoss Explorer!
        Perfect for space enthusiasts and dreamers alike.`
};

export const productListMock: IProduct[] = [
    { ...productMock, image: image1, id: "1" },
    { ...productMock, image: image2, id: "2" },
    { ...productMock, image: image3, id: "3" },
    { ...productMock, image: image4, id: "4" },
    { ...productMock, image: image5, id: "5" },
    { ...productMock, image: image1, id: "6" }
];
