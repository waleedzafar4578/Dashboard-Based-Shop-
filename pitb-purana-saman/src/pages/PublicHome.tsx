import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import sampleImage from "../../public/backgound1.jpg";
import "../style/PublicHome.css";
import { createOrder } from "../services/user";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  category: {
    id: number;
    title: string;
  };
};

type CategoryType = {
  id: number;
  title: string;
};

function PublicHome() {
  const { auth } = useAuth();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [imageWidth, setImageWidth] = useState(
    () => localStorage.getItem("imageWidth") || "300px"
  );
  const [imageHeight, setImageHeight] = useState(
    () => localStorage.getItem("imageHeight") || "200px"
  );

  const [headerText, setHeaderText] = useState<string>(
    localStorage.getItem("headerText") ||
      "Welcome to Government Office Old Saman Portal"
  );
  const [bodyText, setBodyText] = useState<string>(
    localStorage.getItem("bodyText") ||
      `This is the official platform where you can browse and purchase used government equipment and products at very reasonable prices.
All items listed here were part of various government projects and are now available for public sale.
These products are maintained to government standards and can serve well in both commercial and personal use.`
  );
  const [imageSrc, setImageSrc] = useState<string>(
    localStorage.getItem("imageSrc") || sampleImage
  );

  const [tempHeader, setTempHeader] = useState(headerText);
  const [tempBody, setTempBody] = useState(bodyText);
  const [tempImage, setTempImage] = useState(imageSrc);
  const [showModal, setShowModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    price: "",
    units: "",
  });
  const handleSendMail = async () => {
    if (!selectedProduct) return;

    const orderPayload = {
      id: 0,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      price: Number(formData.price),
      uint: Number(formData.units),
      status: false,
      productId: selectedProduct.id,
    };
    
    try {
      const response = await createOrder(orderPayload);
      setShowBuyModal(false);
      setFormData({ name: "", email: "", phone: "", price: "", units: "" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5154/v1/products", {
      headers: { Accept: "text/plain" },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => console.error("Failed to load products"));
  };

  const fetchCategories = () => {
    fetch("http://localhost:5154/v1/categories", {
      headers: { Accept: "text/plain" },
    })
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => console.error("Failed to load categories"));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setTempImage(base64);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDone = () => {
    setHeaderText(tempHeader);
    setBodyText(tempBody);
    setImageSrc(tempImage);

    localStorage.setItem("headerText", tempHeader);
    localStorage.setItem("bodyText", tempBody);
    localStorage.setItem("imageSrc", tempImage);
    localStorage.setItem("imageWidth", imageWidth);
    localStorage.setItem("imageHeight", imageHeight);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  return (
    <div className="public-home-container">
      {auth?.token && (
            <>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  Width:
                  <input
                    type="text"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                </label>
                <label>
                  Height:
                  <input
                    type="text"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(e.target.value)}
                  />
                </label>
              </div>
              <input
                style={{ marginRight: "10px" }}
                className="navbutton"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                className="navbutton"
                onClick={handleDone}
                style={{ marginTop: "10px" }}
              >
                Done
              </button>
            </>
          )}
      <div className="top-section">
        <h1 style={{color:"#16610E",width:'100%',textAlign:'center'}}>{headerText}</h1>
        <div className="public-home-text">
          {auth?.token ? (
            <>
              <input
                type="text"
                value={tempHeader}
                onChange={(e) => setTempHeader(e.target.value)}
                style={{
                  fontSize: "1.5rem",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
              <textarea
                value={tempBody}
                onChange={(e) => setTempBody(e.target.value)}
                rows={15}
                style={{ width: "100%" }}
              />
            </>
          ) : (
            <>
              {bodyText.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </>
          )}
        </div>
        <div className="intro-image">
          <img
            src={imageSrc}
            alt="Purana Saman Saman"
            style={{ width: imageWidth, height: imageHeight }}
          />
        </div>
      </div>
      
      {showBuyModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Request to Buy: {selectedProduct.title}</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Your Offer Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Units Required"
              value={formData.units}
              onChange={(e) =>
                setFormData({ ...formData, units: e.target.value })
              }
            />
            <button
              onClick={() => {
                setShowModal(false);
                handleSendMail();
              }}
              className="navbutton"
              style={{ marginTop: "10px" }}
            >
              Send Mail
            </button>
            <button
              onClick={() => setShowBuyModal(false)}
              className="navbutton"
              style={{ backgroundColor: "#aaa", marginTop: "5px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="category-filter">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? "active" : ""}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category?.title}</p>
            {!auth?.token && (
              <button
                className="navbutton"
                onClick={() => {
                  setSelectedProduct(product);
                  setShowBuyModal(true);
                }}
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="public-home-footer">
        <p>
          For more details, contact the Government Old Saman Department. All
          sales are final and subject to government terms and conditions.
        </p>
      </div>
    </div>
  );
}

export default PublicHome;
