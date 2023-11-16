const url = "https://65562e2184b36e3a431f4c7e.mockapi.io/store";
// const url = "./assets/history.json";

async function fetchProducts() {
  try {
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

const main = document.querySelector("#main-container");

function displayProducts(products) {
  main.innerText = "";
  const productsContainer = document.createElement("section");
  productsContainer.id = "products";

  products.map((product) => {
    const productCard = document.createElement("section");
    productCard.className = "productCard";

    const store = document.createElement("section");
    const productName = document.createElement("h3");
    const date = document.createElement("section");
    const priceNIS = document.createElement("section");
    const priceUSD = document.createElement("section");
    const reference = document.createElement("section");
    reference.id = "reference";
    const arrival = document.createElement("input");
    arrival.type = "checkbox";
    const paymentType = document.createElement("section");

    const storeLabel = document.createElement("label");
    const dateLabel = document.createElement("label");
    const priceNISLabel = document.createElement("label");
    const priceUSDLabel = document.createElement("label");
    const paymentTypeLabel = document.createElement("label");

    storeLabel.innerText = "Store ";
    dateLabel.innerText = "Date ";
    priceNISLabel.innerText = "NIS";
    priceUSDLabel.innerText = "USD";
    paymentTypeLabel.innerText = "paymentType ";

    store.innerText = product.store.toUpperCase();
    productName.innerText = product.product;
    date.innerText = product.date;
    priceNIS.innerText = product.priceNIS;
    priceUSD.innerText = product.priceUSD;
    reference.innerText = product.reference;
    arrival.select = product.arrival;
    reference.innerText = product.reference;
    paymentType.innerText = product.paymentType;

    productCard.append(
      storeLabel,
      store,
      productName,
      dateLabel,
      date,
      priceNIS,
      priceNISLabel,
      priceUSD,
      priceUSDLabel,
      reference,
      arrival,
      paymentTypeLabel,
      paymentType
    );
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.className = "edit-product";
    deleteBtn.className = "delete-product";

    editBtn.addEventListener("click", () => {
      console.log(product);
      editingProduct(product);
    });
    deleteBtn.addEventListener("click", () => {
      deletingProduct(product);
    });

    productCard.append(editBtn, deleteBtn);

    productsContainer.appendChild(productCard);
    main.appendChild(productsContainer);
  });
}

// editing product
function editingProduct(product) {
  const existingForm = document.getElementById("product-form");
  if (existingForm) {
    existingForm.remove();
  }
  const productForm = document.createElement("form");
  productForm.id = "product-form";

  const store = document.createElement("input");
  const productName = document.createElement("input");
  const date = document.createElement("input");
  const priceNIS = document.createElement("input");
  const priceUSD = document.createElement("input");
  const reference = document.createElement("input");
  reference.id = "reference";
  const arrival = document.createElement("input");
  arrival.type = "checkbox";
  const paymentType = document.createElement("input");
  const submitBtn = document.createElement("input");

  const storeLabel = document.createElement("label");
  const productNameLabel = document.createElement("label");
  const dateLabel = document.createElement("label");
  const priceNISLabel = document.createElement("label");
  const priceUSDLabel = document.createElement("label");
  const referenceLabel = document.createElement("label");
  const paymentTypeLabel = document.createElement("label");

  storeLabel.innerText = "Store ";
  productNameLabel.innerText = "Name";
  dateLabel.innerText = "Date ";
  priceNISLabel.innerText = "NIS";
  priceUSDLabel.innerText = "USD";
  referenceLabel.innerText = "paymentType ";
  paymentTypeLabel.innerText = "paymentType ";

  store.value = product.store.toUpperCase();
  productName.value = product.product;
  date.value = product.date;
  priceNIS.value = product.priceNIS;
  priceUSD.value = product.priceUSD;
  reference.value = product.reference;
  arrival.value = product.arrival;
  reference.value = product.reference;
  paymentType.value = product.paymentType;

  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";

  document.documentElement.addEventListener("keydown", async (e) => {
    if (e.key === "Escape") {
      productForm.remove();
    }
  });
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitEditedProduct = {
      ...product,
      store: store.value,
      product: productName.value,
      date: date.value,
      priceNIS: parseFloat(priceNIS.value),
      priceUSD: parseFloat(priceUSD.value),
      reference: reference.value,
      paymentType: paymentType.value,
    };
    await fetchEditingProduct(submitEditedProduct);
    productForm.remove();
  });

  productForm.append(
    storeLabel,
    store,
    productNameLabel,
    productName,
    dateLabel,
    date,
    priceNISLabel,
    priceNIS,
    priceUSDLabel,
    priceUSD,
    referenceLabel,
    reference,
    arrival,
    paymentTypeLabel,
    paymentType,
    submitBtn
  );

  main.appendChild(productForm);
}

async function fetchEditingProduct(currentProduct) {
  console.log(currentProduct);
  try {
    const res = await fetch(url + "/" + currentProduct.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentProduct),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// deleting product
async function deletingProduct(currentProduct) {
  try {
    const res = await fetch(url + "/" + currentProduct.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}
