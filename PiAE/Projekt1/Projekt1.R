require("readxl");
require("gdata")
require("car")
require("rstatix")
require("lmtest")
library(lmtest)
library(ggpubr)
library(ggplot2)
library(rstatix)
library(moments)

setwd("/home/rgegotek/Documents/studia/PiAE/projekt1")
data <- read.table("Dane.csv", header = TRUE, sep = ",")

data$Szerokosc_spodu <- as.factor(data$Szerokosc_spodu)
data$Długosc_szkrzydła <- as.factor(data$Długosc_szkrzydła)

# 1) Normalność Rozklądu 
summary(data) # statystyki zbioru danych
skewness(data$Czas_lotu) # skośnść
kurtosis(data$Czas_lotu) # kurtoza
hist(data$Czas_lotu) # histogram
plot(density.default(x = data$Czas_lotu))
data %>% group_by(Długosc_szkrzydła) %>% get_summary_stats(Czas_lotu, type="mean_sd")
ggboxplot(data, x="Długosc_szkrzydła", y="Czas_lotu")
data %>% group_by(Szerokosc_spodu) %>% get_summary_stats(Czas_lotu, type="mean_sd")
ggboxplot(data, x="Szerokosc_spodu", y="Czas_lotu")
ggqqplot(data, "Czas_lotu", facet.by = "Długosc_szkrzydła")
ggqqplot(data, "Czas_lotu", facet.by = "Szerokosc_spodu")


# test Shapiro
splitSzerokoscSpodu = split(data, data$Szerokosc_spodu)
shapiro.test(splitSzerokoscSpodu$"15"$Czas_lotu)
shapiro.test(splitSzerokoscSpodu$"22"$Czas_lotu)
shapiro.test(splitSzerokoscSpodu$"28"$Czas_lotu)

splitDługoscSzkrzydła = split(data, data$Długosc_szkrzydła)
shapiro.test(splitDługoscSzkrzydła$"27"$Czas_lotu)
shapiro.test(splitDługoscSzkrzydła$"39"$Czas_lotu)
shapiro.test(splitDługoscSzkrzydła$"50"$Czas_lotu)

shapiro.test(data$Czas_lotu)
boxplot(data$Czas_lotu)

# 2) homoskedastycznosc (stałość wariancji reszt)
# primitywna wersja: najwiekszy / najmnieksz > 3 -> brak homoskedastyczności
variance1 <- var(splitSzerokoscSpodu$"15"$Czas_lotu)
variance2 <- var(splitSzerokoscSpodu$"22"$Czas_lotu)
variance3 <- var(splitSzerokoscSpodu$"28"$Czas_lotu)
variance1
variance2
variance3
variance4 <- var(splitDługoscSzkrzydła$"27"$Czas_lotu)
variance5 <- var(splitDługoscSzkrzydła$"39"$Czas_lotu)
variance6 <- var(splitDługoscSzkrzydła$"50"$Czas_lotu)
variance4
variance5
variance6
# lub
# test Levena i Bartletta
leveneTest(data = data, Czas_lotu ~ Szerokosc_spodu)
leveneTest(data = data, Czas_lotu ~ Długosc_szkrzydła)
bartlett.test(Czas_lotu ~ Szerokosc_spodu, data)
bartlett.test(Czas_lotu ~ Długosc_szkrzydła, data)

# 3) Niezależność wariancji
pairwise.t.test(data$Czas_lotu, data$Szerokosc_spodu, p.adjust.method="bonferroni")
pairwise.t.test(data$Czas_lotu, data$Długosc_szkrzydła, p.adjust.method="bonferroni")
pairwise_t_test(data = data, Czas_lotu ~ Szerokosc_spodu, p.adjust.method="bonferroni")
pairwise_t_test(data = data, Czas_lotu ~ Długosc_szkrzydła, p.adjust.method="bonferroni")


#Jednoczynnikowa analiza wariancji
daneanova <- lm(Czas_lotu ~ Szerokosc_spodu, data = data)
anova(daneanova) 
TukeyHSD(aov(daneanova))
data %>% kruskal_test(Czas_lotu~Szerokosc_spodu)
plot(daneanova)

daneanova <- lm(Czas_lotu ~ Długosc_szkrzydła, data = data)
anova(daneanova)
TukeyHSD(aov(daneanova))
plot(daneanova)


#Dwuczynnikowa analiza wariancji bez integracji
res.aov3 <- aov(Czas_lotu ~ Szerokosc_spodu + Długosc_szkrzydła , data = data)
bptest(res.aov3)
summary(res.aov3)
TukeyHSD(res.aov3)
plot(res.aov3)
#Dwuczynnikowa analiza wariancji z integracjami
res.aov4 <- aov(Czas_lotu ~ Szerokosc_spodu * Długosc_szkrzydła , data = data)
bptest(res.aov4)
summary(res.aov4)
TukeyHSD(res.aov4)
plot(res.aov4)
  
#Wykres interakcji
interaction.plot(x.factor = data$Szerokosc_spodu, trace.factor = data$Długosc_szkrzydła,
                 response = data$Czas_lotu, fun = mean,
                 type = "b", legend = TRUE,
                 xlab = "Szerokosc_spodu", ylab="Czas_lotu",
                 pch=c(1,19), col = c("#00AFBB", "#E7B800"))

interaction.plot(x.factor = data$Długosc_szkrzydła, trace.factor = data$Szerokosc_spodu,
                 response = data$Czas_lotu, fun = mean,
                 type = "b", legend = TRUE,
                 xlab = "Długosc_szkrzydła", ylab="Czas_lotu",
                 pch=c(1,19), col = c("#00AFBB", "#E7B800"))
