// import React from "react";

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

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }: Props) => {
  return (
    <div className="card md:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          className="object-cover w-56 h-56"
          src={recipe.imageUrl}
          alt="Recipe"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.summary}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
