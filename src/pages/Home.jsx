import { Fragment, useState } from "react";
import { VisibilityObserver } from "reactjs-visibility";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import AppLayout from "../layouts/AppLayout";

function Home() {
  const [categories, setCategories] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const {
    fetchNextPage,
    isLoading,
    data: pages,
  } = useProducts({
    filter: { categories, maxPrice, minPrice },
  });

  return (
    <AppLayout className="App">
      <Filter
        onChangeCategories={(cats) =>
          cats ? setCategories(cats.id) : setCategories(null)
        }
        onChangeMaxPrice={setMaxPrice}
        onChangeMinPrice={setMinPrice}
      />

      <Loading visible={isLoading} />
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          pages.pages.map((page, key) => (
            <Fragment key={key}>
              {page.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Fragment>
          ))}

        <VisibilityObserver onChangeVisibility={(v) => v && fetchNextPage()} />
      </div>
    </AppLayout>
  );
}

export default Home;
