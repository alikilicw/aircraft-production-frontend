const enumToOptions = (enumObj: any) => {
    return Object.keys(enumObj).map((key) => ({
        value: key,
        content: enumObj[key as keyof typeof enumObj]
    }))
}

export default enumToOptions
