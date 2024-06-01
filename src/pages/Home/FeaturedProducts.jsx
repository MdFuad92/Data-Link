

const FeaturedProducts = () => {
    return (
        <div className="flex justify-center my-5">

            <div role="tablist" className="tabs tabs-bordered ">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Featured" />
                <div role="tabpanel" className="tab-content p-10">Tab content 1</div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All" checked />
                <div role="tabpanel" className="tab-content p-10">Tab content 2</div>


            </div>
        </div>
    );
};

export default FeaturedProducts;