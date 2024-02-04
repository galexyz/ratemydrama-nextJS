import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface SearchFilterProps {
    options: Array<{
        description: string;
        dramaId: number;
        imgUrl: string;
        name: string;
        year: string;
    }>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ options }) => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Array<any>>([]);
    const { category } = router.query; // Access the parameter "slug" from the URL

    useEffect(() => {
        if (query) {
            let filtered = options.filter((option) =>
                option.name.toLowerCase().includes(query)
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    }, [query, options]);

    return (
        <div className="">
            <input
                value={query}
                className="w-96 h-10 px-4 shadow-xl border-primary rounded-xl border-2"
                placeholder="Search for your drama"
                onChange={(e: any) => {
                    setQuery(e.target.value);
                }}
            />
            {filteredOptions.length > 0 && (
                <div className="border-2 border-primary rounded-xl">
                    {filteredOptions.map((option) => {
                        return (
                            <Link
                                href={{
                                    pathname: `/category/${category}/${option.name.replaceAll(
                                        " ",
                                        "-"
                                    )}`,
                                    query: { dramaId: option.dramaId },
                                }}>
                                <div className="cursor-pointer px-3 py-2 text-txt hover:bg-three hover:text-white">{`${option.name} - ${option.year}`}</div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
