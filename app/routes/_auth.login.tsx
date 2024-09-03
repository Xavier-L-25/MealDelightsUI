import { Form, redirect } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.formData();
    const payload = {
      email: String(body.get("email")),
      password: String(body.get("password")),
    };

    let parameter: string = "?useSessionCookies=true";

    if (body.get("rememberMe")) {
      parameter = "?userCookies=true";
    }

    await fetch(
      `https://mealdelightapi-cvh3b3ggcrcxg9ht.eastus-01.azurewebsites.net/login${parameter}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return redirect("/");
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

const Login = () => {
  return (
    <div className="flex-1 w-11/12 lg:w-3/5 mx-auto flex flex-col justify-center">
      <Form className="border p-5" method="post" navigate={false}>
        <h1 className="text-4xl font-bold text-center mb-10">Login</h1>
        <div className="space-y-5">
          <div>
            <p>Email</p>
            <label className="input input-bordered flex items-center gap-2">
              {/*  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                className="grow"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                autoComplete="username"
              />
            </label>
          </div>

          <div>
            <p>Password</p>
            <label className="input input-bordered flex items-center gap-2">
              {/*  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="grow"
                type="password"
                name="password"
                placeholder="Password123!"
                autoComplete="current-password"
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label justify-normal">
              <input className="checkbox" type="checkbox" name="rememberMe" />
              <span className="ps-1">Remember me</span>
            </label>
          </div>

          <button className="btn block mx-auto w-44" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
