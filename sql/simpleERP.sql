DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `userId` int(11) NOT NULL, 
  role varchar(10) DEFAULT  NULL, 
  PRIMARY KEY(`id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)

)ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `pessoa`;

CREATE TABLE `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `tipo` enum('pf','pj') NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `sexo` varchar(9) DEFAULT NULL,
  `nome_fantasia` varchar(60) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `data_fundacao` date DEFAULT NULL,
  `nacionalidade` varchar(30) DEFAULT NULL,
  `estado_civil` varchar(15) DEFAULT NULL,
  `rg` varchar(15) DEFAULT NULL,
  `cpf_cnpj` varchar(14) NOT NULL,
  `inscricao_estadual` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `endereco`;

CREATE TABLE `endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `pessoaId` int(11) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `bairro` varchar(60) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pessoaId` (`pessoaId`),
  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`pessoaId`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `endereco_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `telefone`;

CREATE TABLE `telefone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `pessoaId` int(11) NOT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
   PRIMARY KEY (`id`),
  KEY `pessoaId` (`pessoaId`),
  CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`pessoaId`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `telefone_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `grupo`;

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId`, int(11),
  `descricao` varchar(30) DEFAULT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `subgrupo`;

CREATE TABLE `subgrupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `grupoId` int(11) DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grupos_ibfk_1` (`grupoId`),
  CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`grupoId`) REFERENCES `grupo` (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `tributacao`;

CREATE TABLE `tributacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `descricao` varchar(30) DEFAULT NULL,
  `cfop_dentro_estado` varchar(4),
	`cfop_fora_estado` varchar(4),
  `aliq_icms_venda_dentro_estado` decimal(9,4) DEFAULT 0 NOT NULL,
  `aliq_icms_venda_fora_estado` decimal(9,4) DEFAULT 0 NOT NULL,
  `aliq_icms_reducao_venda` decimal(9,4) DEFAULT 0 NOT NULL,
  `cst_base_venda` varchar(4) DEFAULT NULL,
  `cst_pis_venda` decimal(4,0) DEFAULT 0 NOT NULL,
  `aliq_pis_venda` decimal(9,4) DEFAULT 0 NOT NULL,
  `cst_cofins_venda` varchar(4) DEFAULT NULL,
  `aliq_cofins_venda` decimal(9,4) DEFAULT 0 NOT NULL,
  `aliq_icms_compra_dentro_estado` decimal(9,4) DEFAULT 0 NOT NULL,
  `aliq_icms_compra_fora_estado` decimal(9,4) DEFAULT 0 NOT NULL,
  `aliq_icms_reducao_compra` decimal(9,4) DEFAULT 0 NOT NULL,
  `cst_base_compra` varchar(4) DEFAULT NULL,
  `cst_pis_compra` decimal(4,0) DEFAULT 0 NOT NULL,
  `aliq_pis_compra` decimal(9,4) DEFAULT 0 NOT NULL,
  `cst_cofins_compra` varchar(4) DEFAULT NULL,
  `aliq_cofins_compra` decimal(9,4) DEFAULT 0 NOT NULL,
  `mva` decimal(9,4) DEFAULT 0 NOT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `produto`;

CREATE TABLE `produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `referencia` int(11) DEFAULT NULL,
  `grupoId` int(11) DEFAULT NULL,
  `subgrupoId` int(11) DEFAULT NULL,
  `tributacaoId` int(11) DEFAULT NULL,
  `refencia` varchar(30) DEFAULT NULL,
  `descricao` varchar(60) DEFAULT NULL,
  `codigo_ean` varchar(13) DEFAULT NULL,
  `estoque_atual` decimal(12,4) DEFAULT 0 NOT NULL,
  `estoque_minimo` decimal(12,4) DEFAULT 0 NOT NULL,
  `estoque_maximo` decimal(12,4) DEFAULT 0 NOT NULL,
  `vl_custo` decimal(12,4) DEFAULT 0 NOT NULL,
  `vl_venda` decimal(12,4) DEFAULT 0 NOT NULL,
  `ncm` varchar(10) DEFAULT NULL,
  `status` enum('ATIVO','INATIVO') DEFAULT NULL,
  `fabricante` varchar(60) DEFAULT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`grupoId`) REFERENCES `grupo` (`id`),
  CONSTRAINT `produto_ibfk_2` FOREIGN KEY (`subgrupoId`) REFERENCES `subgrupo` (`id`),
  CONSTRAINT `produto_ibfk_3` FOREIGN KEY (`tributacaoId`) REFERENCES `tributacao` (`id`),
  CONSTRAINT `produto_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `nota`;

CREATE TABLE `nota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),  
  `pessoaId` int(11) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `chave_nfe` varchar(44) DEFAULT NULL,
  `data_emissao` datetime DEFAULT NULL,
  `data_entrada` datetime DEFAULT NULL,
  `valor_desconto` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_acrecismo` decimal(12,4) DEFAULT 0 NOT NULL,
  `subtotal` decimal(12,4) DEFAULT 0 NOT NULL,
  `total` decimal(12,4) DEFAULT 0 NOT NULL,
  `tipo` enum('ENTRADA','SAIDA') DEFAULT NULL,
  `base_icms` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_icms` decimal(12,4) DEFAULT 0 NOT NULL,
  `base_subst` decimal(12,4) DEFAULT 0 NOT NULL,
  `base_ipi` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_ipi` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_frete` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_outros` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_seguro` decimal(12,4) DEFAULT 0 NOT NULL,
  `log_criacao` datetime DEFAULT NULL,
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_pct_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nota_ibfk_1` (`pessoaId`),
  CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`pessoaId`) REFERENCES `pessoa` (`id`),
  CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `nota_itens`;

CREATE TABLE `nota_itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notaId` int(11) DEFAULT NULL,
  `produtoId` int(11) DEFAULT NULL,
  `cfop` varchar(4) DEFAULT NULL,
  `cst` varchar(4) DEFAULT NULL,
  `quantidade` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor` decimal(12,4) DEFAULT 0 NOT NULL,
  `desconto` decimal(12,4) DEFAULT 0 NOT NULL,
  `acrescimo` decimal(12,4) DEFAULT 0 NOT NULL,
  `subtotal` decimal(12,4) DEFAULT 0 NOT NULL,
  `total` decimal(12,4) DEFAULT 0 NOT NULL,
  `aliq_icms` decimal(12,4) DEFAULT 0 NOT NULL,
  `base_icms` decimal(12,4) DEFAULT 0 NOT NULL,
  `valor_icms` decimal(12,4) DEFAULT 0 NOT NULL,
  `aliq_subst` decimal(12,4) DEFAULT 0 NOT NULL,
  `base_subst` decimal(12,4) DEFAULT 0 NOT NULL,
  `aliq_ipi` decimal(12,4) DEFAULT 0 NOT NULL,
  `base_ipi` decimal(12,4) DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nota_itens_ibfk_1` (`notaId`),
  KEY `nota_itens_ibfk_2` (`produtoId`),
  CONSTRAINT `nota_itens_ibfk_1` FOREIGN KEY (`notaId`) REFERENCES `nota` (`id`),
  CONSTRAINT `nota_itens_ibfk_2` FOREIGN KEY (`produtoId`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` int(11) AUTO_INCREMENT, 
  `userId` int(11), 
  `acao` enum('CADASTRAR','EDITAR','ATUALIZAR', 'DELETAR') DEFAULT NULL,
  `registro` varchar(50),
  `log_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `nota_itens_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;