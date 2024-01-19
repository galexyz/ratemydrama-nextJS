import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortSelection = [
    { name: "Newest" },
    { name: "Oldest" },
    { name: "Most Reviews" },
    { name: "Highest Rating" },
];

interface SortDropdownProps {
    setSortBy: (sort: string) => void;
}

const SortDropDown: React.FC<SortDropdownProps> = ({ setSortBy }) => {
    const [sort, setSort] = useState(sortSelection[2]);

    useEffect(() => {
        setSortBy(sort.name);
    }, [sort, setSortBy]);

    return (
        <div className="w-48">
            <Listbox value={sort} onChange={setSort}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md  sm:text-sm">
                        <span className="block truncate text-primary">
                            {sort.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                            {sortSelection.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative hover:bg-four cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-four text-primary"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={person}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}>
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default SortDropDown;
