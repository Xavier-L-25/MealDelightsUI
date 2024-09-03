import { Form, redirect } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Meal Delights" },
    { name: "Meal Delights", content: "Find any recipe you can think of." },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  if (body.get("_action") === "search") {
    return redirect(`/search?query=${body.get("query")}`);
  }

  if (body.get("_action") === "searchAll") {
    return redirect("/search");
  }
}

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex-1 flex flex-col justify-center pb-20">
        <h1 className="text-5xl font-bold text-center">Meal Delights</h1>
        <h3 className="text-5xl font-bold text-center mb-5">
          Lets find your next meal!
        </h3>
        <Form method="post" navigate={false}>
          <label className="input input-bordered flex items-center mx-auto xl:w-2/3 w-10/12 pr-2">
            {/*  */}
            <input
              className="grow"
              type="text"
              name="query"
              placeholder="Search"
            />
            <button className="p-2" type="submit" name="_action" value="search">
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
            </button>
          </label>
          <div className="text-center space-x-10 mt-5">
            <button
              className="btn bg-emerald-400"
              type="submit"
              name="_action"
              value="searchAll"
            >
              See all Recipes
            </button>
            <button
              className="btn bg-cyan-400"
              type="submit"
              name="_action"
              value="search"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
