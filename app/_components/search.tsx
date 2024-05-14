"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button type="submit" size="icon">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
