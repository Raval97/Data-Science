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
library(dplyr)
library(DescTools)
library(factoextra)
library(onewaytests)


setwd("/home/rgegotek/Documents/studia/PiAE/projekt_wyklad/")
data <- read.table("BankChurners.csv", header = TRUE, sep = ",")
length(data$Credit_Limit)
data <- data[sample(nrow(data),1000),]
length(data$Credit_Limit)

# 1) Normalnolnosc Rozkladu
summary(data$Credit_Limit)
skewness(data$Credit_Limit) # sko?no??
kurtosis(data$Credit_Limit) # kurtoza
hist(data$Credit_Limit) # histogram
plot(density.default(x = data$Credit_Limit))
shapiro.test(data$Credit_Limit)
boxplot(data$Credit_Limit)

#Q1 <- quantile(data$Credit_Limit, .25)
#Q3 <- quantile(data$Credit_Limit, .75)
#IQR <- IQR(data$Credit_Limit)
#no_outliers <- subset(data, data$Credit_Limit> (Q1 - 1.5*IQR) & data$Credit_Limit< (Q3 + 1.5*IQR))
#boxplot(no_outliers$Credit_Limit)
#data = no_outliers

# test Shapiro
splitEducation_Level = split(data, data$Education_Level)
shapiro.test(splitEducation_Level$"College"$Credit_Limit)
shapiro.test(splitEducation_Level$"Doctorate"$Credit_Limit)
shapiro.test(splitEducation_Level$"Graduate"$Credit_Limit)
shapiro.test(splitEducation_Level$"High School"$Credit_Limit)
shapiro.test(splitEducation_Level$"Post-Graduate"$Credit_Limit)
shapiro.test(splitEducation_Level$"Uneducated"$Credit_Limit)
shapiro.test(splitEducation_Level$"Unknown"$Credit_Limit)

splitMarital_Status = split(data, data$Marital_Status)
shapiro.test(splitMarital_Status$"Divorced"$Credit_Limit)
shapiro.test(splitMarital_Status$"Married"$Credit_Limit)
shapiro.test(splitMarital_Status$"Single"$Credit_Limit)
shapiro.test(splitMarital_Status$"Unknown"$Credit_Limit)

data %>% group_by(Education_Level) %>% get_summary_stats(Credit_Limit, type="mean_sd")
ggboxplot(data, x="Education_Level", y="Credit_Limit")

data %>% group_by(Marital_Status) %>% get_summary_stats(Credit_Limit, type="min")
ggboxplot(data, x="Marital_Status", y="Credit_Limit")
####################################

# 2) homoskedastycznosc (stałość wariancji reszt)
# test Levena i Bartletta

data$Education_Level <- factor(data$Education_Level)
data$Marital_Status <- factor(data$Marital_Status)
data$Education_Level <- as.numeric(data$Education_Level)
data$Marital_Status <- as.numeric(data$Marital_Status)

leveneTest(data = data, Credit_Limit ~ Education_Level)
leveneTest(data = data, Credit_Limit ~ Marital_Status)
leveneTest(data = data,Credit_Limit ~ Education_Level + Marital_Status)
leveneTest(data = data, Credit_Limit ~ Marital_Status * Education_Level)

bartlett.test(Credit_Limit ~ Education_Level, data)
bartlett.test(Credit_Limit ~ Marital_Status, data)

# 3) Niezależność wariancji
pairwise.t.test(data$Credit_Limit, data$Education_Level, p.adjust.method="bonferroni")
pairwise.t.test(data$Credit_Limit, data$Marital_Status, p.adjust.method="bonferroni")
pairwise_t_test(data = data, Credit_Limit ~ Education_Level, p.adjust.method="bonferroni")
pairwise_t_test(data = data, Credit_Limit ~ Marital_Status, p.adjust.method="bonferroni")
pairwise.wilcox.test(data$Credit_Limit, data$Marital_Status*data$Education_Level, p.adj="bonferroni")
pairwise.wilcox.test(data$Credit_Limit, data$Marital_Statu, p.adj="bonferroni")
pairwise.wilcox.test(data$Credit_Limit, data$Education_Level, p.adj="bonferroni")


#Jednoczynnikowa analiza wariancji
daneanova <- lm(Credit_Limit ~ Education_Level, data = data)
anova(daneanova) 
TukeyHSD(aov(daneanova))
plot(daneanova)

daneanova <- lm(Credit_Limit ~ Marital_Status, data = data)
anova(daneanova)
TukeyHSD(aov(daneanova))
plot(daneanova)

library(DescTools)
DunnettTest(x=data$Credit_Limit, g=data$Marital_Status,control = "Divorced")
DunnettTest(x=data$Credit_Limit, g=data$Marital_Status,control = "Single")
DunnettTest(x=data$Credit_Limit, g=data$Marital_Status,control = "Married")
DunnettTest(x=data$Credit_Limit, g=data$Marital_Status,control = "Unknown")



#kruskall-wallis

kruskal.test(Credit_Limit ~ Education_Level, data = data)
kruskal.test(Credit_Limit ~ Marital_Status, data = data)

welch.test(Credit_Limit ~ Education_Level, data = data)
welch.test(Credit_Limit ~ Marital_Status, data = data)

summary(welch.test(Credit_Limit ~ Education_Level, data = data))
summary(welch.test(Credit_Limit ~ Marital_Status, data = data))

#Dwuczynnikowa analiza wariancji 
print(data %>% 
        group_by(Education_Level, Marital_Status) %>% 
        get_summary_stats(Credit_Limit, type="min"), 
      n=40)

print(data %>%
  group_by(Education_Level, Marital_Status) %>%
  shapiro_test(Credit_Limit)
, n=40)
data %>% group_by(Education_Level, Marital_Status) %>% get_summary_stats(Credit_Limit, type="mean_sd") 
ggboxplot(data, x="Education_Level", y="Marital_Status")

#bez integracji
res.aov3 <- aov(Credit_Limit ~ Education_Level + Marital_Status, data = data)
summary(res.aov3)
TukeyHSD(res.aov3)

library(lmtest)
bptest(res.aov3)

data$Education_Level <- as.numeric(data$Education_Level)
data$Marital_Status <- as.numeric(data$Marital_Status)
friedman.test(y=data$Credit_Limit, groups=data$Education_Level, blocks=data$Marital_Status)
friedman.test(Credit_Limit~Marital_Status|Education_Level, data=data)
print(data %>% friedman_effsize(Credit_Limit ~ Marital_Status | Education_Level))
friedman_effsize(data$Credit_Limit ~ data$Marital_Status | data$Education_Level)

#kendall
XT = xtabs(Credit_Limit ~ Education_Level + Marital_Status, data = data)
KendallW(XT, correct=TRUE, test=TRUE)

#jeśli chodzi o klasyfikację to chodzi o pairwise t-test/TuckeyHD i klasyfikacja, które grupy mają różnice w średniej, a które nie


print(" 0.047 ")


#Dwuczynnikowa analiza wariancji z integracjami
res.aov4 <- aov(Credit_Limit ~ Education_Level * Marital_Status, data = data)
summary(res.aov4)
TukeyHSD(res.aov4)
  

interaction.plot(x.factor = data$Education_Level, trace.factor = data$Marital_Status,
                 response = data$Credit_Limit, fun = mean,
                 type = "b", legend = TRUE,
                 xlab = "Marital_Status", ylab="Credit_Limit",
                 pch=c(1,19), col = c("#00AFBB", "#E7B800"))

interaction.plot(x.factor = data$Marital_Status, trace.factor = data$Education_Level,
                 response = data$Credit_Limit, fun = mean,
                 type = "b", legend = TRUE,
                 xlab = "Education_Level", ylab="Credit_Limit",
                 pch=c(1,19), col = c("#00AFBB", "#E7B800"))


############################# PCA ############################# 
data <- read.table("BankChurners.csv", header = TRUE, sep = ",")
length(data$Credit_Limit)
data <- data[sample(nrow(data),1000),]
data_pca <- data[1:1000, c(5,2,9,13:20)]

data.active <- data_pca[1:1000, c(2:11)]
rownames(data.active) <- data_pca[1:23, 1]
head(data.active)

library("factoextra")
data_pca$Education_Level <- as.factor(data_pca$Education_Level)

res.pca <- prcomp(data_pca, scale=TRUE)
res.pca <- prcomp(data.active, scale=TRUE)
fviz_eig(res.pca)
res.pca

fviz_pca_ind(res.pca,
             col.ind = "cos2", # Color by the quality of representation
             gradient.cols = c("#00AFBB", "#E7B800", "#FC4E07"),
             repel = TRUE
             # Avoid text overlapping
)

fviz_pca_var(res.pca,col.var="contrib", # Color by contributions to the PC
             gradient.cols=c("#00AFBB", "#E7B800", "#FC4E07"),
             repel=TRUE# Avoid text overlapping
             )

fviz_pca_biplot(res.pca, repel=TRUE,
                col.var="#2E9FDF", # Variables 
                colorcol.ind="#696969" # Individuals color
                )
                
groups <- as.factor(data_pca$Education_Level)
groups
fviz_pca_ind(res.pca,
             col.ind = groups, # color by groups
             palette = c("#00AFBB",
                         "#FC4E07",
                         "#00AFB0",
                         "#00AFB1",
                         "#00AFBB",
                         "#00AFBB"),
             addEllipses = TRUE, # Concentration ellipses
             ellipse.type = "confidence",
             legend.title = "Groups",
             repel = TRUE
)

# Eigenvalues             
eig.val<-get_eigenvalue(res.pca)
eig.val

# Results for Variables
res.var<-get_pca_var(res.pca)
res.var$coord # Coordinates
res.var$contrib # Contributions to the PCs
res.var$cos2 # Quality of representation 

# Results for individuals
res.ind<-get_pca_ind(res.pca)
res.ind$coord # Coordinates
res.ind$contrib # Contributions to the PC
res.ind$cos2 # Quality of representation                
