import { ReactNode, useEffect, useState } from "react";
import { Form, json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import RecipeCard from "~/components/RecipeCard";

interface Recipe {
  id: number;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  name: string;
  summary: string;
  type: string;
  userId: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    let query = new URL(request.url).searchParams.get("query");
    if (query === null) query = "";

    const res = await fetch(
      `https://mealdelightapi-cvh3b3ggcrcxg9ht.eastus-01.azurewebsites.net/api/recipe?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return json(data);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

const Search = () => {
  const recipesData = useLoaderData<typeof loader>();

  const [recipes, setRecipes] = useState<{ recipeCards: ReactNode[] }>({
    recipeCards: [],
  });

  useEffect(() => {
    const cards = recipesData.map((recipe: Recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });

    setRecipes((prevState) => ({ ...prevState, recipeCards: cards }));
  }, [recipesData]);

  const handleSubmit = () => {
    console.log("working");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Form onSubmit={handleSubmit} navigate={false}>
          <label className="input input-bordered flex items-center mx-auto xl:w-2/3 w-10/12">
            {/*  */}
            <input
              className="grow"
              type="text"
              name="query"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-8 w-8 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </Form>
        {recipes.recipeCards}
      </div>
    </>
  );
};

export default Search;
