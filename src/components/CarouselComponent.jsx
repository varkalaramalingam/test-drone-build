import React from 'react'
import CardItem from './CardComponent';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselComponent() {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 3 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };

     return (
        <Carousel
          className="carousel"
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          dotListClass="custom-dot-list-style"
        >
          <div> <CardItem title="Athadu" description="Athadu" img="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAH0AfQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQAGBwMCAQj/2gAIAQEAAAAA2EDEiSTDeZZZRfIqyyA46UYWZSni3henBjeQTLGJPURaAlOZ39mykDpaey52gE7WDwVor5jIPR/oufKxvt4V9dEsjWTnRWee1EKfLAR50ixOZPNQ95lWh/ntg+FvT61SeKb1oaZDxhzjk5s+kScM1lP0rGgvhLNWddtekCxbz2a5m8EA6Cd7/tEi/BYzeZfoCBZ3S/NG2uRZ+d/RDzkQOKyow+h7hIq/NX3w4svQgJOm63jZJFP5lgzJqL95cOJehbBIuwDiA94kexRF3XQdjkW4OIkO4SBePHbSNun/xAAZAQACAwEAAAAAAAAAAAAAAAABAgADBAX/2gAKAgIQAxAAAAASrLTeLZEYX9DLBicHRXbnrTL19+QTmbehydSVvWuHrdDIDyuh1eNeijPbn07FEzJLd2IxGirrgmNbmjAgyvTA+QaEYM9Cg6IK8Fl8MLFZLv/EAEAQAAIBAwMBBAYGCAQHAAAAAAECAwAEEQUSITETQVGyBiAiMmF0BxAUFTVxQkNjcoGCobEjJHORMzRSU2Jkwf/aAAgBAQABPwCtVG7S9QHjay+U0QQygknk8mkQ1GhJpY2BpEIq51OxsCouJ8MRnaoLNVtqNncKzQ3CsFA3dRjPI60hnn5DGGLGd36RHjz0HxqC6glysM4kCkj3snigNwyDTR/E1o8Wy7lP7M/3Hqann7tv/lpfKaEe+RfZx1NCI5AApYSCOKSMmljAK8Uno7e6jLezPMkbi4f2WBO7mtN0d9LC3U93FJA8T9oCMFWjbFahqk18zKpKQA8J4/Fqt5HhZXRiGFabffal54kHUeNYBweMVYIFmc/+HqX/APyF5/oSeWo1DTA9wjYn+FQxJIFcYKkAgjoaMXPSliPHsnFajqtppqruxI5HuKw4/M1aX1rfwvdS2gdg8jexyyA1qd7BBp9jYRgwkAyzRN1Uye6DQPPNRngVZ3DQSJIvcagcSRq6+6wBH8ashiRv3fU1AbrC8HjbyeWobOE26OIky8XPHXcO+tGtZIZ5xEcWwOOzY5KmjGACxIAA5J4ArWpFk1CR45dxL7Fw27hRj2fhWoewY4ge7cainmgJMUroT12kio7qT7R28xMzHhu09skdO+p4JBEtwwGwvhWUewUZdyEUjdPyqOQ1pjhrK156xLVn75/d9S7G60uR4xP/AGq7vVtLS1ij9qZ4kCj+Fadavbo3ae/Jy1a/HbC0iebJYTAxqDjJHj8BSyn7TO5xk8AnjiruXtLh2/If7Vms1bziT0U7IDcIr4jPeo94eY0vupQbAxWmHNnZ4/7S1YH/ABG/d9SUbopFPehFG3H3wmekVvgf2FMCrDaueeK1/UPtN44D4ihzGnHU95p5NgOAcmiSSSfrs702tlNYuhH2pBID8Q3FBAI43HUgn867gfEZrSiBZWJ8bda06QNO6j/o9R/cb8jRBGpTN+yWrlZ5beZLeQRyupVXP6Oa1LTLzTgDdIu13Ko6sCCRUg3EmiRngfUhAYZ93v8Ayr7VvNrK59qNDFnxUKQpNbP8jp820jej5J7yOalyv5bM1p86jT7D5da0WcSX0q/sSf6j1JOI3/dNTyYv35/UrSyjNem86vPYQgnckTuf5zVnoGoX2nJewlCXdxHEeCyp3g1Nbz28rxTRMkiHDKwwRWD4VzVisE0klvOdoljYRvn3JByufgehr7WGgtFLkqkQwR3Bu8Cry5SYKyk+5girW8xZ2a56RivRGcy6vOCelo3mX1LlttvO3hGx/pV3ebbwNvTJjGRQvmJ4KVr8Ml1fTy78kxIAB3YWj2VqlpCmxYoYNuCccAAf/KvLpry7uLl+ssjP/vRP1Q7CHVlzkZH5rzU9/wBtbQW6IEjjLNgccvjNPJjIHSkuT2EK8cKK9AJd+s3PyT+dfU1E7dPvT4W8nlq4m3Tbs9wqOYhhzTpNNLmOVFR49kofjIBBwDitYvxJZTyAkEQOo/mrPGK0OyjnlM86BokOFUjgtWqW8dvdSdim2LPAHdUbYYHwNN04NM1K2Y15r6Ofxu5+Rfzp6mrHGlaif/Vm8hqVzn3qjcZ5aopto65Bq3isZfR70ivLy3SUW6xrCG7pCKG6R1VQNztgDuyat7ZbWwgI6dq8YPjsCk/1atRxIZl7zyKstM1G9tr28trYvBZjM75AC1Fps9zpM+px4MEE4hl7iCwGDUoKkVG3dX0b/jdz8i/nT1NaO3R9UPhZz+Q0ZC9B9vfQuMDrwKsLtJ/Qj0qV5AHF7bvXovplsbGDU540kM+sRWCb+RGjr7bj41eX1tpgutIvUnL2uoSMkse3O1wAcg1rGiXlpfxwIyyJcXHYwTggozZwQcE4K94r0iv7m1gt9Bisp7Kwg9sCUESXRP66StGu4z6C+kVv3rewED/UK1MC3AFbGDV9Gmfv26+Qfzp6mu8aJq3yM/kNGUnvoS1NN7GAetejM+67n0x7nsItRiEQlJwI5kO+F60oaxJrFtYarI8NppswvLtWURxoIud3sAZ3GnvNJ1QXOo77aLU4NWNyguTsSeAvuVKi12C5vrKCzsonFrNc3qoTtjkuGTgLvxtRSc1L6Oz6xqWn315qH2q21KZoZLm2yRBMO7DfoVFH93+i2vq7+3JrEFsoHjb5YmlEciK4yMihbxtX0exBNcuvkX86epr3Oh6v8jP5DWxvCgjZxTnJNWsVy3C2QfIznsyakvdVnthYy3khgDK3YuxI46UkchO1VVvySmglJx2CHnHud/TFSSXcdrNDG8ixOwLxozhXK9MgGtR1TUb6K3iusBELOMRiPe7cNI+Pec4wTUEgEYUE5HWkfOOa+j7H3xc/Jv519TWOdJ1L5SbyGjDC36oiprYCKXYAGCmlsrGQ7Rf4yB1jJNfaYEhWIXOVAIw0Xce47SOuKe5gRi6XzE7UGBbge50K+GKivLdsK8+wbs/8MjJI5J681PdKGIjvhjJ57Lgj+XFdvapu33CyMz7i/ZEdeoxV49nfENcahsVW9hAhzz8TmnFjbFewuTMSxDZTGBSvCQD0NfR7+M3PIP8Akn86eprH4Rqfyc3kNIRzuGT49Ku3IRgOMikOHBFYOOTmicHpQkNNNJjg4p3djyxopkZzQT40q7ehr6Nfxu5+Rfzp9f8A/8QAJBEBAAICAgICAQUAAAAAAAAAAQACAxEQITFREnEEIiMzQXL/2gAIAQIBAT8Alk3LWlXH23toJ8C1n4+PcyYvj2eJi/kr98MbFiyOtTHRyOt6j+LVoaf1e58TGBLG5j6y1++Hwy9gAP77Z+Nja4zfl4yGw9jxR/eP9cPh+pfqwkxZN4q3ugvCSo7lMSZd+nh7GOE+JEbFKb6IpSv0TZau5WpU6jU5SVp3uXG3Up0ag9x8PLLKHRuLb1Cz6jvU28i7jPJAmo174//EACkRAQACAQMDAwIHAAAAAAAAAAEAAgMREjEQISIEMmFBURMzQkNxgpH/2gAIAQMBAT8AeGVq6SuOGLK/l11Za7iPP3faYfUb3a9mZKmxepjcbQTXdM1zADpqswestW7ax4J7Zks5b2tDsjF1w6/HQ5Jjo2u2t+l0rPVZDLmtt4OxA0JV01+RIk/Y/qdDklNGt6v3Zkwlct6YxQnHS2kc41K9NdO8PU33W+Wb6Vra57nmHkzhlrN1WU95/PR4YSrr/kDSBysQNJU8jo8M7TDWjbzvsPvosPwdUcn152rGuL6Zh+NqS4MrXyHo8MOZvTgIXYXZySvZDp//2Q==" /></div>
          <div> <CardItem title="Annavaram" description="Annavaram" img="https://www.bing.com/th?id=AMMS_69be0ebc1b5b973a43463d6f76ac8f12&w=100&h=150&c=7&rs=1&qlt=80&pcl=f9f9f9&o=6&cdv=1&dpr=1.25&pid=16.1" /></div>
          <div> <CardItem title="One" description="One" img="https://www.bing.com/th?id=AMMS_2c823cb31868cb06bad816d4a8e848d1&w=140&h=183&c=8&rs=1&o=5&dpr=1.25&pid=3.1&rm=2" /></div>
          <div> <CardItem title="Kung Fu Panda" description="Kung Fu Panda" img="https://www.bing.com/th?id=AMMS_f5369a3ecd8e6c69d1b97900734a6527&w=126&h=183&c=8&rs=1&o=5&dpr=1.25&pid=3.1&rm=2" /></div>
          <div> <CardItem title="Seventh Sense" description="Seventh Sense" img="https://www.bing.com/th?id=OIP._f_FXRnf6rmsrbuB85a6LwAAAA&w=124&h=170&rs=1&qlt=80&o=6&dpr=1.25&pid=3.1" /></div>
          <div> <CardItem title="Immortals" description="Immortals" img="https://www.bing.com/th?id=AMMS_4e1a1cd890df4576d8e8cc04a32f9e33&w=124&h=183&c=8&rs=1&o=5&dpr=1.25&pid=3.1&rm=2" /></div>
        </Carousel>
      )
}

export default CarouselComponent
