library(tidyverse)

df <- read_csv("src/data/538-college-mayor-economic-guide.csv")

output <- df |>
  rename_all(tolower) |>
  select(major, total, median) |> 
  mutate(major = str_to_title(major),
         major = str_replace_all(major, "And ", "& "))

cat(format_csv(output))
