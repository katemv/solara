import { useState } from "react";
import PageContainer from "../../components/Molecules/PageContainer/PageContainer.component";
import Product from "../../components/Pages/Products/ProductItem/ProductItem.component";
import Banner from "../../components/Organisms/Banner/Banner.component";
import Flex from "../../components/Atoms/Flex/Flex.component";
import Text from "../../components/Atoms/Text/Text.component";
import Tab from "../../components/Molecules/Tabs/Tab.component";
import { Categories, IProduct, Nullable } from "../../types";
import { CATEGORIES } from "../../utils/constants";
import { fullWidth, Grid } from "./styles";
import ProductDetailsModal from "../../components/Pages/Products/ProductDetailsModal/ProductDetailsModal.component";

import { productListMock } from "../../utils/mocks";


const ShopPage = () => {
    const [currentCategory, setCurrentCategory] = useState<Categories>(Categories.ALL_PRODUCTS);
    const [currentProduct, setCurrentProduct] = useState<Nullable<IProduct>>(null);

    return (
        <>
            <Banner headingIntlKey="pages.shop.banner" subheadingIntlKey="pages.shop.banner_description" />
            <PageContainer>
                <Grid>
                    <Text
                        as="h2"
                        intlKey="pages.shop.popular_products"
                        appearance="headline3"
                        style={fullWidth}
                    />
                    {productListMock.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            horizontal
                            onClick={() => setCurrentProduct(product)}
                        />
                    ))}
                    <Text
                        as="h2"
                        intlKey="pages.shop.categories"
                        appearance="headline3"
                        style={fullWidth}
                    />
                    <Flex gap="spacing2" marginBottom="spacing4" wrap data-full-width>
                        <Tab
                            isActive={currentCategory === Categories.ALL_PRODUCTS}
                            onClick={() => setCurrentCategory(Categories.ALL_PRODUCTS)}
                            label={Categories.ALL_PRODUCTS}
                        />
                        {CATEGORIES.map((category) => (
                            <Tab
                                key={category}
                                isActive={currentCategory === category}
                                onClick={() => setCurrentCategory(category)}
                                label={category}
                            />
                        ))}
                    </Flex>
                    <Text
                        as="h2"
                        intlKey={currentCategory}
                        appearance="headline2"
                        style={fullWidth}
                    />
                    <Text
                        as="p"
                        intlKey={`${currentCategory}_description`}
                        appearance="paragraph"
                        fontWeight={300}
                        color="dark20"
                        style={{ ...fullWidth, width: "80%" }}
                        marginBottom="spacing4"
                    />
                    {productListMock.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            onClick={() => setCurrentProduct(product)}
                        />
                    ))}
                </Grid>
            </PageContainer>

            <ProductDetailsModal
                $visible={!!currentProduct}
                product={currentProduct}
                onClose={() => {
                    setCurrentProduct(null);
                }}
            />
        </>
    );
};

export default ShopPage;
